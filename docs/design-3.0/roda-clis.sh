#!/bin/bash
W="C:/Users/rmmarera/Desktop/Club de Vantagens/elphy-site-v3"; D="$W/docs/design-3.0"; LOG="$D/log-clis.txt"
cd "$W" || exit 1
echo "[$(date '+%H:%M')] 1/3 Codex implementa" >> "$LOG"
codex exec --skip-git-repo-check - < "$D/BRIEFING-CODEX.md" > "$D/saida-codex-1.txt" 2>&1 </dev/null
echo "[$(date '+%H:%M')] 2/3 Grok revisa" >> "$LOG"
"C:/Users/rmmarera/AppData/Local/cursor-agent/agent.cmd" --model grok-4.7-xhigh --trust -f -p "Leia o arquivo $D/REVISAO-GROK.txt (UTF-8) e faça exatamente o que ele pede." --output-format text </dev/null > "$D/saida-grok.txt" 2>&1
echo "[$(date '+%H:%M')] 3/3 Codex corrige" >> "$LOG"
codex exec --skip-git-repo-check - < "$D/CORRECAO-CODEX.txt" > "$D/saida-codex-2.txt" 2>&1 </dev/null
echo "[$(date '+%H:%M')] FIM" >> "$LOG"
