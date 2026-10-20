"""Restore companion Markdown assets and prepare the selected course diagrams.

Usage: python scripts/extract-geometry-book.py PDF MARKDOWN OUTPUT_DIRECTORY
Requires PyMuPDF and Pillow. The supplied book is not copied into the repository.
"""
import hashlib
import json
import re
import sys
from pathlib import Path
from urllib.parse import unquote

import fitz
from PIL import Image, ImageOps


def native_image(book, xref):
    pix = fitz.Pixmap(book, xref)
    if pix.colorspace is None:  # PDF stencil: 1 means ink, not white paper.
        return ImageOps.invert(Image.frombytes('L', (pix.width, pix.height), pix.samples)).convert('RGB')
    pix = fitz.Pixmap(fitz.csRGB, pix)
    return Image.frombytes('RGB', (pix.width, pix.height), pix.samples)


def extract(pdf_path, markdown_path, bundle):
    root = Path(__file__).resolve().parents[1]
    assets = root / 'geometry/schuberth'
    manifest = json.loads((assets / 'manifest.json').read_text())
    assert hashlib.sha256(pdf_path.read_bytes()).hexdigest() == manifest['sha256'], 'Different source PDF'
    book = fitz.open(pdf_path)
    bundle.mkdir(parents=True, exist_ok=True)
    (bundle / markdown_path.name).write_bytes(markdown_path.read_bytes())
    links = re.findall(r'!\[[^\]]*\]\(([^)]+)\)', markdown_path.read_text())
    for link in links:
        target = bundle / unquote(link)
        assert target.resolve().is_relative_to(bundle.resolve()), 'Image link escapes output directory'
        target.parent.mkdir(parents=True, exist_ok=True)
        m = re.search(r'page-(\d+)-(source|figure-(\d+))', link)
        page = book[int(m[1]) - 1]
        if m[2] == 'source':
            page.get_pixmap(matrix=fitz.Matrix(2, 2)).save(str(target))
        else:
            native_image(book, page.get_images()[int(m[3]) - 1][0]).save(target)
    for figure in manifest['figures'].values():
        page = book[figure['page'] - 1]
        rect = fitz.Rect(figure['crop'])
        scale = min(3, 1200 / rect.width, 1500 / rect.height)
        canvas = Image.new('RGB', (round(rect.width * scale), round(rect.height * scale)), 'white')
        # Composite isolated PDF images in their original relative positions, without
        # neighbouring text or clipped captions from the page text layer.
        for info in page.get_image_info(xrefs=True):
            if info['xref'] not in figure['xrefs']:
                continue
            bbox = fitz.Rect(info['bbox'])
            im = native_image(book, info['xref'])
            im = im.resize((round(bbox.width * scale), round(bbox.height * scale)), Image.Resampling.LANCZOS)
            canvas.paste(im, (round((bbox.x0 - rect.x0) * scale), round((bbox.y0 - rect.y0) * scale)))
        canvas.save(assets / figure['file'], quality=92, method=6)
        figure['width'], figure['height'] = canvas.size
    (assets / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
    placements_path = assets / 'placements.json'
    placements = json.loads(placements_path.read_text())
    dimensions = {f['file']: f for f in manifest['figures'].values()}
    for figures in placements.values():
        for figure in figures:
            figure.update({k: dimensions[figure['file']][k] for k in ['width', 'height']})
    placements_path.write_text(json.dumps(placements, ensure_ascii=False, indent=2) + '\n')
    print(f'Restored {len(links)} Markdown assets; prepared {len(manifest["figures"])} course figures.')


if __name__ == '__main__':
    extract(*map(Path, sys.argv[1:]))
