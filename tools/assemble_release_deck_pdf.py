from pathlib import Path

from PIL import Image


source = Path("release-package/rendered-final-qa")
output = Path("release-package/Netflix_After_Hours_Executive_Release_Deck.pdf")
slides = [
    Image.open(source / f"slide-{number}.png").convert("RGB").resize((1280, 720), Image.Resampling.LANCZOS)
    for number in range(1, 11)
]
slides[0].save(
    output,
    save_all=True,
    append_images=slides[1:],
    resolution=120.0,
    quality=82,
    optimize=True,
)
for slide in slides:
    slide.close()
print(output.resolve())
