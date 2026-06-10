// ===================================================
//  nivel2.js — Nivel 2: Innovar con propósito
//  Objetivo: 50 WPM
//  Modo GOD:
//  - progreso guardado en localStorage
//  - subniveles 10 y 20 son canciones
//  - scroll automático del texto
//  - sonido con Phaser
//  - botón activar / desactivar sonido
// ===================================================


// ===================================================
//  CANCIONES
//  Pega aquí la letra de cada canción.
//  No borres las comillas invertidas ` `
// ===================================================
const song_n2_10 = `No creas que en mis días
Siempre brilla el sol
Pues nubes aparecen y sin avisar
Y cuando está oscuro
Yo también tengo miedo

No pienses que mis flores
Nunca morirán
A veces he pedido y me han dicho no
A veces yo espero, a veces yo me canso
Mas nada me impedirá sonreír
Y alegre estar, yo puedo en él confiar

A cada paso mi Dios conmigo está
Y tengo paz, en Cristo tengo paz
Yo paso la tormenta
Seguro y escondido en el Señor

Tengo paz, no puedo entender
Que en medio del desierto
Renace la esperanza por doquier
Tengo paz

El universo riges con poder
Que me podría arrebatar, la paz
Las tempestades no me alcanzarán
Si estoy contigo tengo paz

Tengo paz, en Cristo tengo paz
Yo paso la tormenta
Seguro y escondido en el Señor

Tengo paz, no puedo entender
Que en medio del desierto
Renace la esperanza por doquier
Tengo paz`;


const song_n2_20 = `Adentro fuera arriba abajo
Siempre soy feliz

Adentro fuera arriba abajo
Siempre soy feliz

Jesús vino hacia mí
Le di mi corazón

Adentro fuera arriba abajo
Siempre soy feliz

Adentro afuera arriba abajo
Siempre soy feliz

Adentro afuera arriba abajo
Siempre soy feliz

Jesús vino hacia mí
Le di mi corazón

Jesús vino hacia mí
Le di mi corazón

Adentro afuera arriba abajo
Siempre soy feliz`;


// ===================================================
//  PRELOAD
//  Carga el audio antes de entrar al juego.
//  OJO: como nivel2.html está en /template,
//  la ruta correcta es ../assets/audio/...
// ===================================================
class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload' });
    }

    preload() {
        // Canción subnivel 10
        this.load.audio('n2_song1', '/game/audio/cancion3.mp3');

        // Canción subnivel 20
        this.load.audio('n2_song2', '/game/audio/cancion4.mp3');
    }

    create() {
        this.scene.start('LevelSelect');
    }
}


// ===================================================
//  LISTA DE FRASES DEL NIVEL 2
//  Sub 10 y 20 son canciones
// ===================================================
    const words20_n2 = [
    "La innovación con propósito inicia cuando una necesidad real se analiza con empatía, orden y responsabilidad.",
    "Un proyecto útil requiere diagnóstico, diseño, prueba y mejora continua; no basta con tener una buena idea.",
    "El estudiante identifica el problema, compara alternativas y selecciona la solución más ética y sostenible.",
    "La tecnología debe respetar la dignidad humana; por eso, cada decisión técnica necesita criterio moral.",
    "La excelencia académica se evidencia en procesos claros, datos confiables y resultados verificables.",
    "Innovar también implica cuidar recursos, reducir desperdicios y pensar en el bienestar de la comunidad.",
    "El trabajo en equipo fortalece la creatividad, porque cada integrante aporta una mirada diferente.",
    "Cuando el conocimiento se orienta al servicio, la solución adquiere sentido social y espiritual.",
    "La sabiduría guía la planificación; por eso, antes de construir, el equipo define objetivos y límites.",
    song_n2_10,

    "El prototipo se evalúa con métricas de usabilidad, precisión, accesibilidad y pertinencia educativa.",
    "Una mejora responsable considera seguridad, privacidad, inclusión y mantenimiento a largo plazo.",
    "El liderazgo cristiano promueve decisiones transparentes, comunicación respetuosa y cumplimiento de compromisos.",
    "La investigación aplicada permite transformar una pregunta en evidencia, y la evidencia en una solución útil.",
    "Cada línea de código puede expresar orden, paciencia y servicio cuando se escribe con propósito claro.",
    "El estudiante documenta el proceso, valida los resultados y reconoce las limitaciones del sistema desarrollado.",
    "La innovación pierde valor si ignora a las personas; gana sentido cuando responde a una necesidad concreta.",
    "El aprendizaje significativo integra mente, carácter y acción; así, la tecnología se convierte en herramienta de bien.",
    "Al finalizar la fase técnica, el equipo comprende que crear con excelencia también es una forma de servir.",
    song_n2_20
    ];

// ===================================================
//  FUNCIONES DE DESBLOQUEO
// ===================================================
function getCurrentUserId_n2() {
    try {
        const user = JSON.parse(localStorage.getItem('tq_current_user'));
        return user?.id || user?.correo || 'guest';
    } catch {
        return 'guest';
    }
}

function getProgressKey_n2() {
    return `n2_max_${getCurrentUserId_n2()}`;
}

function getUnlockedLevel_n2() {
    if (window.TypeQuestProgress?.getUnlockedLevel) {
        return window.TypeQuestProgress.getUnlockedLevel(2);
    }

    const key = getProgressKey_n2();
    let unlocked = localStorage.getItem(key);

    if (!unlocked) {
        unlocked = 1;
        localStorage.setItem(key, unlocked);
    } else {
        unlocked = parseInt(unlocked, 10);
    }

    return unlocked;
}

function setUnlockedLevel_n2(level) {
    if (window.TypeQuestProgress?.saveUnlockedLevel) {
        window.TypeQuestProgress.saveUnlockedLevel(2, level);
        return;
    }

    const key = getProgressKey_n2();
    const current = getUnlockedLevel_n2();

    if (level > current) {
        localStorage.setItem(key, level);
    }
}


// ===================================================
//  ESCENA: SELECTOR DE SUBNIVELES
// ===================================================
class LevelSelect extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelSelect' });
    }

    create() {
        const W = this.scale.width;
        const H = this.scale.height;
        const unlocked = getUnlockedLevel_n2();

        // Limpia overlays viejos si quedaron abiertos
        document.querySelectorAll('.typing-overlay').forEach(el => el.remove());

        this.add.rectangle(W / 2, H / 2, W, H, 0x0a1a00);

        this.add.text(W / 2, 38, 'NIVEL 2 — INNOVAR CON PROPÓSITO', {
            fontSize: '26px',
            fill: '#7ecf5a',
            fontFamily: 'Courier New',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(W / 2, 68, 'Objetivo: 50 WPM · técnica y propósito', {
            fontSize: '13px',
            fill: '#4a8a30',
            fontFamily: 'Courier New'
        }).setOrigin(0.5);

        this.add.text(W / 2, 88, 'Selecciona un subnivel', {
            fontSize: '13px',
            fill: '#555',
            fontFamily: 'Courier New'
        }).setOrigin(0.5);

        const menuBtn = this.add.text(20, 12, '← Menú', {
            fontSize: '15px',
            fill: '#aaa',
            fontFamily: 'Courier New'
        }).setInteractive({ useHandCursor: true });

        menuBtn.on('pointerover', () => menuBtn.setStyle({ fill: '#fff' }));
        menuBtn.on('pointerout', () => menuBtn.setStyle({ fill: '#aaa' }));
        menuBtn.on('pointerdown', () => {
            window.location.href = '/menu';
        });

        for (let i = 0; i < 20; i++) {
            const sublevel = i + 1;
            const col = i % 5;
            const row = Math.floor(i / 5);
            const x = 130 + col * 135;
            const y = 155 + row * 100;

            const isActive = sublevel <= unlocked;
            const isSong = sublevel === 10 || sublevel === 20;
            const bgColor = isActive ? (isSong ? 0x1a4d00 : 0x2d6e1a) : 0x2a2a2a;
            const txtColor = isActive ? '#ffffff' : '#555555';

            const btn = this.add.rectangle(x, y, 110, 60, bgColor)
                .setStrokeStyle(2, isActive ? (isSong ? 0xaaff44 : 0x55cc33) : 0x444444);

            if (isActive) {
                btn.setInteractive({ useHandCursor: true });
                btn.on('pointerover', () => btn.setFillStyle(isSong ? 0x2a6e00 : 0x3d9e25));
                btn.on('pointerout', () => btn.setFillStyle(bgColor));

                btn.on('pointerdown', () => {
                    const timeLimit = isSong ? 240 : 60;

                    this.scene.start('PlayGame', {
                        sublevel,
                        word: words20_n2[i],
                        timeLimit
                    });
                });
            }

            this.add.text(x, y - 9, `Subnivel ${sublevel}`, {
                fontSize: '13px',
                fill: txtColor,
                fontFamily: 'Courier New',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            this.add.text(x, y + 12, isActive ? (isSong ? '🎵 JUGAR' : '▶ JUGAR') : '🔒', {
                fontSize: '11px',
                fill: isActive ? '#88ff66' : '#444',
                fontFamily: 'Courier New'
            }).setOrigin(0.5);
        }
    }
}


// ===================================================
//  ESCENA: JUEGO
// ===================================================
class PlayGame extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayGame' });
    }

    init(data) {
        this.sublevel = data.sublevel || 1;
        this.targetText = data.word || '';
        this.typed = '';

        this.timeLeft = data.timeLimit || 60;
        this.initialTime = this.timeLeft;

        this.finished = false;
        this.startTime = null;
        this.timerStarted = false;
        this.timerEvent = null;

        this.overlay = null;
        this.inputEl = null;
        this.phraseEl = null;
        this.scrollBox = null;

        this.isSongLevel = this.sublevel === 10 || this.sublevel === 20;

        this.music = null;
        this.musicEnabled = true;
        this.soundBtn = null;
    }

    create() {
        const W = this.scale.width;
        const H = this.scale.height;

        this.add.rectangle(W / 2, H / 2, W, H, 0x0a1a00);

        this.add.text(W / 2, 28, `SUBNIVEL ${this.sublevel} — Superficie | Meta: 50 WPM`, {
            fontSize: '16px',
            fill: '#7ecf5a',
            fontFamily: 'Courier New',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const back = this.add.text(16, 12, '← Volver', {
            fontSize: '14px',
            fill: '#aaa',
            fontFamily: 'Courier New'
        }).setInteractive({ useHandCursor: true });

        back.on('pointerover', () => back.setStyle({ fill: '#fff' }));
        back.on('pointerout', () => back.setStyle({ fill: '#aaa' }));
        back.on('pointerdown', () => {
            this.stopMusic();
            this.cleanup();
            this.scene.start('LevelSelect');
        });

        this.timerPhaserText = this.add.text(W - 16, 12, '⏱ Escribe para iniciar', {
            fontSize: '14px',
            fill: '#888',
            fontFamily: 'Courier New',
            fontStyle: 'bold'
        }).setOrigin(1, 0);

        // Botón de sonido
        if (this.isSongLevel) {
            this.soundBtn = this.add.text(W - 110, 12, '🔊', {
                fontSize: '20px',
                fill: '#ffdd55',
                fontFamily: 'Courier New'
            }).setInteractive({ useHandCursor: true });

            this.soundBtn.on('pointerdown', () => {
                this.musicEnabled = !this.musicEnabled;

                if (this.musicEnabled) {
                    this.soundBtn.setText('🔊');

                    if (this.music && this.timerStarted && !this.music.isPlaying) {
                        this.music.resume ? this.music.resume() : this.music.play();
                    }
                } else {
                    this.soundBtn.setText('🔇');

                    if (this.music && this.music.isPlaying) {
                        this.music.pause();
                    }
                }
            });
        }

        this.wpmPhaserText = this.add.text(16, 38, 'WPM: 0', {
            fontSize: '14px',
            fill: '#66ccff',
            fontFamily: 'Courier New'
        });

        this.accPhaserText = this.add.text(16, 58, 'Precisión: 100%', {
            fontSize: '14px',
            fill: '#aaffaa',
            fontFamily: 'Courier New'
        });

        this.add.text(W - 16, 38, '🎯 Meta: 50 WPM', {
            fontSize: '13px',
            fill: '#4a8a30',
            fontFamily: 'Courier New'
        }).setOrigin(1, 0);

        this.add.text(W / 2, 82, 'Escribe la frase exactamente como aparece:', {
            fontSize: '12px',
            fill: '#555',
            fontFamily: 'Courier New'
        }).setOrigin(0.5);

        // Barra de progreso
        this.add.rectangle(W / 2, H - 28, W - 60, 14, 0x1a2a1a).setOrigin(0.5);
        this.progressBar = this.add.rectangle(30, H - 28, 2, 10, 0x2d6e1a).setOrigin(0, 0.5);
        this.progressMaxW = W - 60;

        this.progressPct = this.add.text(W / 2, H - 28, '0%', {
            fontSize: '10px',
            fill: '#666',
            fontFamily: 'Courier New'
        }).setOrigin(0.5);

        this.hintText = this.add.text(W / 2, H - 60, '🖱 Haz clic en la pantalla para escribir', {
            fontSize: '12px',
            fill: '#333',
            fontFamily: 'Courier New'
        }).setOrigin(0.5);

        this.buildHTMLOverlay(W, H);

        // Cargar música según subnivel
        if (this.isSongLevel) {
            const audioKey = this.sublevel === 10 ? 'n2_song1' : 'n2_song2';

            if (this.cache.audio.exists(audioKey)) {
                this.music = this.sound.add(audioKey, {
                    loop: false,
                    volume: 0.5
                });
            }
        }
    }

    buildHTMLOverlay(W, H) {
        const canvas = this.game.canvas;
        const rect = canvas.getBoundingClientRect();
        const scaleX = rect.width / W;

        this.overlay = document.createElement('div');
        this.overlay.className = 'typing-overlay';

        Object.assign(this.overlay.style, {
            position: 'fixed',
            top: rect.top + 'px',
            left: rect.left + 'px',
            width: rect.width + 'px',
            height: rect.height + 'px',
            pointerEvents: 'none',
            zIndex: '10',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        });

        this.scrollBox = document.createElement('div');
        Object.assign(this.scrollBox.style, {
            background: 'rgba(0,0,0,0.65)',
            border: '1px solid #1a3a00',
            borderRadius: '8px',
            padding: '20px 26px',
            maxWidth: `${Math.round(700 * scaleX)}px`,
            width: '88%',
            height: this.isSongLevel ? `${Math.round(320 * scaleX)}px` : 'auto',
            maxHeight: this.isSongLevel ? `${Math.round(320 * scaleX)}px` : 'none',
            overflowY: 'hidden',
            overflowX: 'hidden',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
        });

        this.phraseEl = document.createElement('div');
        Object.assign(this.phraseEl.style, {
            fontFamily: '"Courier New", monospace',
            fontSize: this.isSongLevel ? `${Math.round(18 * scaleX)}px` : `${Math.round(20 * scaleX)}px`,
            lineHeight: this.isSongLevel ? '1.95' : '1.8',
            textAlign: 'left',
            letterSpacing: this.isSongLevel ? '1px' : '1.2px',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
            userSelect: 'none',
            transform: 'translateY(0px)',
            transition: 'transform 0.08s linear'
        });

        this.renderPhrase();
        this.scrollBox.appendChild(this.phraseEl);
        this.overlay.appendChild(this.scrollBox);

        // Input invisible
        this.inputEl = document.createElement('input');
        Object.assign(this.inputEl.style, {
            position: 'fixed',
            top: '-9999px',
            left: '-9999px',
            opacity: '0',
            width: '1px',
            height: '1px',
            border: 'none',
            outline: 'none',
            pointerEvents: 'all'
        });

        this.inputEl.setAttribute('autocomplete', 'off');
        this.inputEl.setAttribute('autocorrect', 'off');
        this.inputEl.setAttribute('autocapitalize', 'none');
        this.inputEl.setAttribute('spellcheck', 'false');

        this.inputEl.addEventListener('input', () => this.onInput());
        this.inputEl.addEventListener('paste', e => e.preventDefault());
        this.inputEl.addEventListener('keydown', e => {
            if (this.finished) e.preventDefault();
        });

        this.overlay.appendChild(this.inputEl);
        document.body.appendChild(this.overlay);

        setTimeout(() => this.inputEl.focus(), 150);
        this.game.canvas.addEventListener('click', () => this.inputEl.focus());
    }

    renderPhrase() {
        const target = this.targetText;
        const typed = this.typed;
        let html = '';

        for (let i = 0; i < target.length; i++) {
            const ch = target[i];
            const display = ch === ' ' ? '&nbsp;' : ch;

            if (i < typed.length) {
                html += typed[i] === target[i]
                    ? `<span style="color:#44ff66">${display}</span>`
                    : ch === ' '
                        ? `<span style="color:#ff4444;text-decoration:underline">&nbsp;</span>`
                        : `<span style="color:#ff4444;background:rgba(255,0,0,0.12)">${display}</span>`;
            } else if (i === typed.length) {
                html += `<span style="color:#fff;border-bottom:2px solid #7ecf5a;padding-bottom:1px">${display}</span>`;
            } else {
                html += `<span style="color:#3a4a3a">${display}</span>`;
            }
        }

        this.phraseEl.innerHTML = html;

        // Scroll automático más suave
        if (this.isSongLevel && this.scrollBox && this.phraseEl) {
            const visibleHeight = this.scrollBox.clientHeight;
            const fullHeight = this.phraseEl.scrollHeight;
            const maxMove = Math.max(0, fullHeight - visibleHeight);

            let progress = 0;

            if (this.music && this.music.isPlaying && this.music.duration > 0) {
                // Espera antes de empezar a subir
                const delay = 10;
                const adjustedTime = Math.max(0, this.music.seek - delay);
                const adjustedDuration = Math.max(1, this.music.duration - delay);

                progress = adjustedTime / adjustedDuration;
            } else {
                progress = target.length > 0 ? typed.length / target.length : 0;
            }

            progress = Phaser.Math.Clamp(progress, 0, 1);

            if (progress < 0.05) {
                progress = 0;
            }

            const slowFactor = 0.45;
            const moveY = maxMove * progress * slowFactor;

            this.phraseEl.style.transform = `translateY(-${moveY}px)`;
        }
    }

    onInput() {
        if (this.finished) return;

        let raw = this.inputEl.value;

        if (raw.length > this.targetText.length) {
            raw = raw.slice(0, this.targetText.length);
            this.inputEl.value = raw;
        }

        if (!this.timerStarted && raw.length > 0) {
            this.timerStarted = true;
            this.startTime = Date.now();

            this.timerPhaserText.setText(`⏱ ${this.initialTime}s`);
            this.timerPhaserText.setStyle({ fill: '#ffdd55', fontSize: '18px' });
            this.hintText.setVisible(false);

            this.timerEvent = this.time.addEvent({
                delay: 1000,
                loop: true,
                callback: this.tickTimer,
                callbackScope: this
            });

            if (this.isSongLevel && this.music && this.musicEnabled && !this.music.isPlaying) {
                this.music.play();
            }
        }

        this.typed = raw;
        this.renderPhrase();
        this.updateStats();

        if (this.typed.length === this.targetText.length) {
            this.endGame(this.typed === this.targetText);
        }
    }

    updateStats() {
        const typed = this.typed;
        const target = this.targetText;

        const pct = typed.length / target.length;
        this.progressBar.width = Math.max(2, this.progressMaxW * pct);
        this.progressPct.setText(Math.round(pct * 100) + '%');

        if (this.startTime) {
            const mins = (Date.now() - this.startTime) / 60000;
            const words = typed.trim().split(/\s+/).filter(Boolean).length;
            const wpm = mins > 0 ? Math.round(words / mins) : 0;

            this.wpmPhaserText.setText(`WPM: ${wpm}`);
            this.wpmPhaserText.setStyle({
                fill: wpm >= 50 ? '#44ff66' : wpm >= 35 ? '#ffdd55' : '#66ccff'
            });
        }

        let correct = 0;
        for (let i = 0; i < typed.length; i++) {
            if (typed[i] === target[i]) correct++;
        }

        const acc = typed.length > 0 ? Math.round((correct / typed.length) * 100) : 100;
        this.accPhaserText.setText(`Precisión: ${acc}%`);
    }

    tickTimer() {
        if (this.finished) return;

        this.timeLeft--;
        this.timerPhaserText.setText(`⏱ ${this.timeLeft}s`);

        if (this.timeLeft <= 10) {
            this.timerPhaserText.setStyle({ fill: '#ff4444' });
        } else if (this.timeLeft <= 20) {
            this.timerPhaserText.setStyle({ fill: '#ffaa00' });
        }

        if (this.isSongLevel) {
            this.renderPhrase();
        }

        if (this.timeLeft <= 0) {
            this.endGame(false);
        }
    }

    stopMusic() {
        if (this.music) {
            this.music.stop();
            this.music.destroy();
            this.music = null;
        }
    }

    endGame(won) {
        if (this.finished) return;
        this.finished = true;

        if (this.timerEvent) {
            this.timerEvent.remove();
        }

        this.stopMusic();

        if (won && this.sublevel < 20) {
            setUnlockedLevel_n2(this.sublevel + 1);
        }

        const typed = this.typed;
        const target = this.targetText;
        let correct = 0;

        for (let i = 0; i < typed.length; i++) {
            if (typed[i] === target[i]) correct++;
        }

        const acc = typed.length > 0 ? Math.round((correct / typed.length) * 100) : 0;
        const elapsed = this.startTime ? (Date.now() - this.startTime) / 60000 : 1 / 60;
        const words = typed.trim().split(/\s+/).filter(Boolean).length;
        const wpm = elapsed > 0 ? Math.round(words / elapsed) : 0;
        const timeUsed = this.initialTime - this.timeLeft;

        if (window.TypeQuestProgress?.saveResult) {
            window.TypeQuestProgress.saveResult({
                nivel: 2,
                subnivel: this.sublevel,
                wpm,
                precision: acc,
                tiempoUsado: timeUsed,
                gano: won
            });
        }

        this.cleanup();

        this.scene.start('ResultScreen', {
            won,
            acc,
            wpm,
            typed,
            target,
            sublevel: this.sublevel,
            timeUsed,
            correct,
            total: target.length,
            initialTime: this.initialTime
        });
    }

    cleanup() {
        this.stopMusic();

        if (this.overlay && this.overlay.parentNode) {
            this.overlay.parentNode.removeChild(this.overlay);
            this.overlay = null;
        }
    }

    shutdown() {
        this.cleanup();
    }

    destroy() {
        this.cleanup();
    }
}


// ===================================================
//  ESCENA: RESULTADOS
// ===================================================
class ResultScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'ResultScreen' });
    }

    init(data) {
        this.won = data.won;
        this.acc = data.acc;
        this.wpm = data.wpm;
        this.sublevel = data.sublevel;
        this.timeUsed = data.timeUsed;
        this.typed = data.typed;
        this.target = data.target;
        this.correct = data.correct;
        this.total = data.total;
        this.initialTime = data.initialTime || 60;
    }

    create() {
        const W = this.scale.width;
        const H = this.scale.height;

        this.add.rectangle(W / 2, H / 2, W, H, 0x030a00);

        const pW = 520;
        const pH = 390;

        this.add.rectangle(W / 2, H / 2, pW, pH, 0x081400)
            .setStrokeStyle(2, this.won ? 0x44ff66 : 0xff4444);

        const metaOk = this.wpm >= 50;
        const icon = this.won ? (metaOk ? '🏆' : '✅') : '⏰';
        const title = this.won ? (metaOk ? '¡INNOVACIÓN LOGRADA!' : '¡RETO COMPLETO!') : 'TIEMPO AGOTADO';
        const color = this.won ? (metaOk ? '#44ff66' : '#ffdd55') : '#ff4444';

        this.add.text(W / 2, H / 2 - 165, icon, {
            fontSize: '36px'
        }).setOrigin(0.5);

        this.add.text(W / 2, H / 2 - 125, title, {
            fontSize: '28px',
            fill: color,
            fontFamily: 'Courier New',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(W / 2, H / 2 - 92, `Subnivel ${this.sublevel} — Innovar`, {
            fontSize: '14px',
            fill: '#7ecf5a',
            fontFamily: 'Courier New'
        }).setOrigin(0.5);

        this.add.text(W / 2, H / 2 - 72,
            `${this.wpm} WPM ${metaOk ? '✓ Meta alcanzada' : '✗ Meta: 50 WPM'}`, {
                fontSize: '14px',
                fill: metaOk ? '#44ff66' : '#ff8844',
                fontFamily: 'Courier New',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        this.add.rectangle(W / 2, H / 2 - 55, pW - 60, 1, 0x1a3a00);

        [
            ['⌛ Tiempo', `${this.timeUsed}s de ${this.initialTime}s`],
            ['⚡ Velocidad', `${this.wpm} WPM`],
            ['🎯 Precisión', `${this.acc}%`],
            ['✅ Correctas', `${this.correct} / ${this.total} letras`]
        ].forEach(([lbl, val], i) => {
            const y = H / 2 - 32 + i * 42;

            if (i % 2 === 0) {
                this.add.rectangle(W / 2, y + 8, pW - 60, 32, 0x0e1e00).setOrigin(0.5);
            }

            this.add.text(W / 2 - 190, y, lbl, {
                fontSize: '14px',
                fill: '#aaa',
                fontFamily: 'Courier New'
            });

            this.add.text(W / 2 + 185, y, val, {
                fontSize: '14px',
                fill: '#fff',
                fontFamily: 'Courier New',
                fontStyle: 'bold'
            }).setOrigin(1, 0);
        });

        this.add.rectangle(W / 2, H / 2 + 108, pW - 60, 1, 0x1a3a00);

        this.add.text(
            W / 2,
            H / 2 + 126,
            this.won
                ? (metaOk ? 'Innovar con propósito también es servir mejor.' : 'Completaste el reto; ahora busca excelencia con propósito.')
                : 'Sigue practicando: la constancia convierte el conocimiento en servicio.',
            {
                fontSize: '12px',
                fill: '#666',
                fontFamily: 'Courier New'
            }
        ).setOrigin(0.5);

        const hasNext = this.won && this.sublevel < 20;
        const btnY = H / 2 + 162;

        if (hasNext) {
            this.makeBtn(W / 2 - 240, btnY, '↺ Reintentar', 0x1a3d00, () => {
                const tl = (this.sublevel === 10 || this.sublevel === 20) ? 140 : 60;
                this.scene.start('PlayGame', {
                    sublevel: this.sublevel,
                    word: words20_n2[this.sublevel - 1],
                    timeLimit: tl
                });
            });

            this.makeBtn(W / 2 - 80, btnY, '☰ Subniveles', 0x0d2600, () => {
                this.scene.start('LevelSelect');
            });

            this.makeBtn(W / 2 + 80, btnY, `▶ Sub ${this.sublevel + 1}`, 0x1a5e2a, () => {
                const next = this.sublevel + 1;
                const tl = (next === 10 || next === 20) ? 240 : 60;

                this.scene.start('PlayGame', {
                    sublevel: next,
                    word: words20_n2[next - 1],
                    timeLimit: tl
                });
            });

            this.makeBtn(W / 2 + 240, btnY, '🏠 Menú', 0x1a1a1a, () => {
                window.location.href = '/menu';
            });
        } else {
            this.makeBtn(W / 2 - 190, btnY, '↺ Reintentar', 0x1a3d00, () => {
                const tl = (this.sublevel === 10 || this.sublevel === 20) ? 240 : 60;
                this.scene.start('PlayGame', {
                    sublevel: this.sublevel,
                    word: words20_n2[this.sublevel - 1],
                    timeLimit: tl
                });
            });

            this.makeBtn(W / 2, btnY, '☰ Subniveles', 0x0d2600, () => {
                this.scene.start('LevelSelect');
            });

            this.makeBtn(W / 2 + 190, btnY, '🏠 Menú', 0x1a1a1a, () => {
                window.location.href = '/menu';
            });
        }
    }

    makeBtn(x, y, label, bg, cb, w = 140) {
        const btn = this.add.rectangle(x, y, w, 44, bg)
            .setInteractive({ useHandCursor: true })
            .setStrokeStyle(1, 0xffffff33);

        this.add.text(x, y, label, {
            fontSize: '13px',
            fill: '#fff',
            fontFamily: 'Courier New',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        btn.on('pointerover', () => btn.setAlpha(0.75));
        btn.on('pointerout', () => btn.setAlpha(1));
        btn.on('pointerdown', cb);
    }
}


// ===================================================
//  INICIAR PHASER
// ===================================================
window.onload = function () {
    new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-container',
        backgroundColor: '#0a1a00',
        scene: [Preload, LevelSelect, PlayGame, ResultScreen]
    });
};