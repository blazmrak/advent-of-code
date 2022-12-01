import express from 'express'

const app = express()
app.use(express.json())
app.post('/years/:year/days/:day/parts/:part', async ({params: {year, day, part}, body: {input}}, res) => {
    const result = await (await import(`../${year}/problems/day-${day}/node/part-${part}.mjs`)).execute(input)
    res.json({result})
})
app.listen(3000, () => console.log('listening'))