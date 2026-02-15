const CANVAS_W = 400
const CANVAS_H = 300

export function renderToCanvas(html: string): Promise<HTMLCanvasElement> {
  return new Promise((resolve) => {
    const iframe = document.createElement('iframe')
    iframe.style.cssText = `position:fixed;left:-9999px;width:${CANVAS_W}px;height:${CANVAS_H}px;border:none`
    document.body.appendChild(iframe)

    const doc = iframe.contentDocument!
    doc.open()
    doc.write(`<!DOCTYPE html><html><head><style>*{margin:0;padding:0}body{width:${CANVAS_W}px;height:${CANVAS_H}px;overflow:hidden}</style></head><body>${html}</body></html>`)
    doc.close()

    // Give it time to render
    setTimeout(() => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = CANVAS_W
        canvas.height = CANVAS_H
        const ctx = canvas.getContext('2d')!

        // Use html2canvas-like approach via foreignObject SVG
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS_W}" height="${CANVAS_H}">
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml">${doc.documentElement.outerHTML}</div>
          </foreignObject>
        </svg>`

        const img = new Image()
        img.onload = () => {
          ctx.drawImage(img, 0, 0)
          document.body.removeChild(iframe)
          resolve(canvas)
        }
        img.onerror = () => {
          document.body.removeChild(iframe)
          resolve(canvas) // empty canvas on error
        }
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
      } catch {
        document.body.removeChild(iframe)
        const canvas = document.createElement('canvas')
        canvas.width = CANVAS_W
        canvas.height = CANVAS_H
        resolve(canvas)
      }
    }, 100)
  })
}

export function compareCanvases(target: HTMLCanvasElement, output: HTMLCanvasElement): { accuracy: number; diffCanvas: HTMLCanvasElement } {
  const diffCanvas = document.createElement('canvas')
  diffCanvas.width = CANVAS_W
  diffCanvas.height = CANVAS_H
  const diffCtx = diffCanvas.getContext('2d')!

  const targetCtx = target.getContext('2d')!
  const outputCtx = output.getContext('2d')!

  const targetData = targetCtx.getImageData(0, 0, CANVAS_W, CANVAS_H)
  const outputData = outputCtx.getImageData(0, 0, CANVAS_W, CANVAS_H)
  const diffData = diffCtx.createImageData(CANVAS_W, CANVAS_H)

  let matching = 0
  const total = CANVAS_W * CANVAS_H

  for (let i = 0; i < targetData.data.length; i += 4) {
    const dr = Math.abs(targetData.data[i] - outputData.data[i])
    const dg = Math.abs(targetData.data[i + 1] - outputData.data[i + 1])
    const db = Math.abs(targetData.data[i + 2] - outputData.data[i + 2])
    const diff = (dr + dg + db) / 3

    if (diff < 30) {
      matching++
      // Green overlay for matching
      diffData.data[i] = outputData.data[i]
      diffData.data[i + 1] = outputData.data[i + 1]
      diffData.data[i + 2] = outputData.data[i + 2]
      diffData.data[i + 3] = 128
    } else {
      // Red overlay for diff
      diffData.data[i] = 243
      diffData.data[i + 1] = 139
      diffData.data[i + 2] = 168
      diffData.data[i + 3] = 200
    }
  }

  diffCtx.putImageData(diffData, 0, 0)
  return { accuracy: Math.round((matching / total) * 10000) / 100, diffCanvas }
}
