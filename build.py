import os
import shutil
from pathlib import Path


def parse_metadata(content):
    meta = {
        "title": "ЛогисТрек",
        "description": "ЛогисТрек — международная логистика и перевозки",
        "keywords": "логистика, перевозки, грузоперевозки",
        "preload_images": [],
    }

    if content.startswith("<!--") and "-->" in content:
        meta_block = content.split("-->")[0].strip("<!--").strip()
        for line in meta_block.split("\n"):
            if ":" in line:
                key, value = line.split(":", 1)
                key = key.strip()
                value = value.strip()
                if key == "preload_images":
                    meta["preload_images"] = [img.strip() for img in value.split(",")]
                else:
                    meta[key] = value
    return meta


def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)


def copy_static_files():
    if os.path.exists("dist/static"):
        shutil.rmtree("dist/static")
    shutil.copytree("static", "dist/static")


def build_page(template, content, output_path):
    meta = parse_metadata(content)

    if content.startswith("<!--") and "-->" in content:
        content = content.split("-->", 1)[1].strip()

    preload_tags = ""
    for image in meta.get("preload_images", []):
        if image.endswith(('.webp', '.png', '.jpg', '.jpeg')):
            file_type = "image/webp" if image.endswith('.webp') else "image/jpeg"
            preload_tags += f'<link rel="preload" as="image" href="static/images/{image}" type="{file_type}">\n'

    page = template.replace("{{ content }}", content)
    page = page.replace("{{ page.title }}", meta["title"])
    page = page.replace("{{ meta.description }}", meta["description"])
    page = page.replace("{{ meta.keywords }}", meta["keywords"])
    page = page.replace("<!-- PRELOAD_PLACEHOLDER -->", preload_tags)

    header = Path("templates/header.html").read_text(encoding="utf-8")
    footer = Path("templates/footer.html").read_text(encoding="utf-8")
    page = page.replace("{% include 'header.html' %}", header)
    page = page.replace("{% include 'footer.html' %}", footer)

    Path(output_path).write_text(page, encoding="utf-8")


def build_site():
    base_template = Path("templates/base.html").read_text(encoding="utf-8")

    for page_file in Path("content").glob("*.html"):
        content = page_file.read_text(encoding="utf-8")
        output_path = page_file.name
        build_page(base_template, content, output_path)

    print("✅ Сборка завершена!")


if __name__ == "__main__":
    build_site()
