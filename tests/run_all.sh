#!/bin/bash
# Corre todas las pruebas. Necesita node, Chrome y los paquetes puppeteer-core y jsdom.
cd "$(dirname "$0")"; export NODE_PATH="/home/claude/chk/node_modules${NODE_PATH:+:$NODE_PATH}"
node humo.js || exit 1
node pvp.js || exit 1
node navegador.js 2>&1 | grep -v "agent-proxy\|connect_rejected\|Allowed domains\|For details\|^- \|^\[agent" ; exit ${PIPESTATUS[0]}
