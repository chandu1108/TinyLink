require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { nanoid } = require('nanoid'); // optional for random codes
const prisma = new PrismaClient();

const app = express();

// const { PrismaClient } = require("@prisma/client");

app.use(cors());
app.use(express.json());

// Helper: generate code
function generateCode() {
  return nanoid(7); // 6-8 chars Ok
}

// POST /api/links
app.post('/api/links', async (req, res) => {
  try {
    const { targetUrl, code } = req.body;
    if (!targetUrl) return res.status(400).json({ error: 'targetUrl required' });

    // validate code regex if provided
    const finalCode = code ? code : generateCode();
    const codeRegex = /^[A-Za-z0-9]{6,8}$/;
    if (!codeRegex.test(finalCode)) {
      return res.status(400).json({ error: 'code must match [A-Za-z0-9]{6,8}' });
    }

    // create (handle 409)
    try {
      const created = await prisma.link.create({
        data: { code: finalCode, targetUrl, clicks: 0 }
      });
      return res.status(201).json(created);
    } catch (err) {
      // unique violation
      return res.status(409).json({ error: 'code already exists' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// GET /api/links
app.get('/api/links', async (req, res) => {
  const links = await prisma.link.findMany({ orderBy: { createdAt: 'desc' }});
  res.json(links);
});

// GET /api/links/:code
app.get('/api/links/:code', async (req, res) => {
  const { code } = req.params;
  const link = await prisma.link.findUnique({ where: { code }});
  if (!link) return res.status(404).json({ error: 'not found' });
  res.json(link);
});

// DELETE /api/links/:code
app.delete('/api/links/:code', async (req, res) => {
  const { code } = req.params;
  try {
    await prisma.link.delete({ where: { code }});
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: 'not found' });
  }
});

// Redirect route GET /:code
app.get('/:code', async (req, res) => {
  const { code } = req.params;
  const link = await prisma.link.findUnique({ where: { code }});
  if (!link) return res.status(404).send('404 and no longer redirect.');

  // atomic update increment clicks and lastClicked
  await prisma.link.update({
    where: { code },
    data: { clicks: { increment: 1 }, lastClicked: new Date() }
  });

  // 302 redirect
  res.redirect(302, link.targetUrl);
});

// healthz
// app.get('/healthz', (req, res) => res.json({ status: 'ok' }));


  // HEALTHCHECK ROUTE

  // Healthcheck endpoint
app.get('/healthz', async (req, res) => {
  try {
    // DB check
    await prisma.link.count();

    res.json({
      status: "ok",
      uptime_seconds: process.uptime(),
      timestamp: new Date().toISOString(),
      node_version: process.version,
      database_connected: true
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      database_connected: false,
      message: err.message
    });
  }
});



// app.get('/healthz', async (req, res) => {
//   let db_ok = true;
//   try {
//     await prisma.$queryRaw`SELECT 1`;
//   } catch (err) {
//     db_ok = false;
//   }

//   res.json({
//     status: "ok",
//     uptime_seconds: process.uptime(),
//     timestamp: new Date().toISOString(),
//     node_version: process.version,
//     database_connected: db_ok
//   });
// });



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server running on', PORT));
