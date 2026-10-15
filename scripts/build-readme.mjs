// README.md is generated from prompts.json — edit prompts.json, then run:
//   node scripts/build-readme.mjs
import fs from 'node:fs'

const root = new URL('..', import.meta.url).pathname
const doc = JSON.parse(fs.readFileSync(`${root}prompts.json`, 'utf8'))
const utm = 'utm_source=github&utm_medium=readme&utm_campaign=awesome-chatgpt-pictures-of-yourself-prompts'
const site = (path) => `https://veida.ai${path}?${utm}`
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const gallery = site('/prompts/pictures-of-yourself')
// "photo-prompt" means the author did not name a model.
const modelName = (m) => (m === 'photo-prompt' ? 'not stated' : doc.models[m])

const order = doc.categories.filter((c) => doc.entries.some((e) => e.category === c))
let md = `# Awesome ChatGPT Prompts for Pictures of Yourself

A hand-picked gallery of **real ChatGPT prompts for pictures of yourself**, shared by creators on X. Every prompt is written around **your own uploaded photo**, and every entry keeps the **full prompt, verbatim**, the **output image**, and a **link to the original post**.

No generated-by-script prompt lists: each prompt below was posted by a person alongside the picture it made.

> ⚡ **Run any of these with your own photo right now:** open the [ChatGPT prompts for pictures of yourself gallery on Veida](${gallery}), pick a card and press *Make it with my photo* — the prompt drops into the generator and the photo picker opens.

## Contents

`
for (const c of order) md += `- [${c}](#${slug(c)}) (${doc.entries.filter((e) => e.category === c).length})\n`
md += `- [How to use these prompts](#how-to-use-these-prompts)\n- [Contributing](#contributing)\n\n`

let n = 0
for (const c of order) {
  md += `## ${c}\n\n`
  for (const e of doc.entries.filter((x) => x.category === c)) {
    n++
    md += `### ${n}. ${e.title}\n\n<img src="${e.image}" width="420" alt="${e.title.replace(/"/g, '')}">\n\n`
    md += `**Model:** ${modelName(e.model)} · **By:** [@${e.author.handle}](https://x.com/${e.author.handle}) · **Source:** [original post](${e.source_url})\n\n`
    md += '```text\n' + e.prompt.replace(/```/g, "'''") + '\n```\n\n'
    md += `[▶ Make it with your photo](${gallery})\n\n---\n\n`
  }
}

md += `## How to use these prompts

1. Pick a clear, evenly lit photo of yourself, face toward the camera.
2. Copy a prompt block, or open the [gallery on Veida](${gallery}) and press *Make it with my photo*.
3. Where a prompt says "she" or "he", change it to match your photo.
4. If a take drifts from your face, reply with "keep the face exactly the same as in the first close-up".

## Contributing

Found a great prompt for pictures of yourself on X, Reddit or elsewhere? Open a pull request with the full prompt, the output image and a link to the original post. Entries without a source link are not accepted.

## Credits & takedown

All prompts and images belong to their original creators and are linked to the source post. If you are a creator and want your entry removed or re-credited, open an issue and it will be handled promptly.
`
fs.writeFileSync(`${root}README.md`, md)
console.log(`README.md: ${n} entries`)
