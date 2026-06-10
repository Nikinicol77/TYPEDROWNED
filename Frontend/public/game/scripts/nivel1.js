// ===================================================
//  nivel1.js — Nivel 1: Transformar el carácter
//  Modo GOD:
//  - progreso guardado en localStorage
//  - subniveles 10 y 20 son canciones
//  - scroll automático del texto
//  - sonido con Phaser
// ===================================================


// ===================================================
//  CANCIONES
//  Pega aquí la letra de cada canción.
//  No borres las comillas invertidas ` `
// ===================================================
const song_n1_10 = `Cristo me ama bien lo sé
Su palabra me hace ver
Que los niños son de aquel
Quien es nuestro amigo fiel

Sí Cristo me ama
Sí Cristo me ama
Sí Cristo me ama
La Biblia dice así

Cristo me ama pues murió
Y después resucitó
Y así mis culpas se llevó
Con su amor me perdonó

Sí Cristo me ama
Sí Cristo me ama
Sí Cristo me ama
La Biblia dice así

Cristo me ama es verdad
Y me cuida en su bondad
El buen pastor me guiará
Y por siempre me protegerá

Sí Cristo me ama
Sí Cristo me ama
Sí Cristo me ama
La Biblia dice así

Sí Cristo me ama
Sí Cristo me ama
Sí Cristo me ama
Sí Cristo me ama

Él me ama
La biblia dice así
Él me ama
Me cuida y es mi amigo
Mi amigo fiel`;


const song_n1_20 = `Yo tengo un amigo que me ama
Me ama, me ama
Yo tengo un amigo que me ama
Su Nombre es Jesús.
Que me ama, que me ama
Que me ama, con inmenso amor
Que me ama, que me ama
Que me ama, con inmenso amor
 
Tú tienes un amigo que te ama
Te ama, te ama
Tú tienes un amigo que te ama
Su nombre es Jesús.

Que te ama, que te ama
Que te ama, con su inmenso amor

Que te ama, que te ama
Que te ama, con su inmenso amor

Tenemos un amigo que nos ama,
nos ama, nos ama.
Tenemos un amigo que nos ama,
Su nombre es Jesús.

Que nos ama, que nos ama,
Que nos ama con su inmenso amor.
Que nos ama, que nos ama,
Que nos ama con su inmenso amor.`;


// ===================================================
//  PRELOAD
//  Carga el audio antes de entrar al juego.
//  Guarda tus canciones en: assets/audio/
// ===================================================
class Preload extends Phaser.Scene {
    constructor() { super({ key: 'Preload' }); }

    preload() {
        // Canción subnivel 10 — archivo: assets/audio/cancion1.mp3
        this.load.audio('n1_song1', '/game/audio/cancion1.mp3');

        // Canción subnivel 20 — archivo: assets/audio/n1_cancion2.mp3
        this.load.audio('n1_song2', '/game/audio/cancion2.mp3');
    }

    create() { this.scene.start('LevelSelect'); }
}


// ===================================================
//  LISTA DE FRASES DEL NIVEL 1
//  Sub 10 y 20 son canciones — no borrar
// ===================================================
    const words20 = [
    "Ana despertó con una idea sencilla hoy iba a practicar la bondad",
    "Al salir de casa recordó que un corazón alegre también aprende mejor",
    "En el camino ayudó a un compañero y sintió paz en su interior",
    "Su abuela le dijo que hacer el bien transforma poco a poco el carácter",
    "Ana decidió hablar con respeto aunque estuviera cansada",
    "En clase escribió una frase sobre la fe la esperanza y el amor",
    "El profesor explicó que la disciplina diaria abre puertas al futuro",
    "Ana entendió que la honestidad vale más que ganar fácil",
    "Antes de dormir dio gracias por aprender a servir con alegría",

    song_n1_10,

    "Al día siguiente Ana compartió sus apuntes con quien no pudo estudiar",
    "Cuando cometió un error respiró profundo y volvió a intentarlo",
    "Recordó que todo lo que se hace con amor deja una huella buena",
    "En el descanso eligió palabras amables y evitó discutir",
    "Su equipo terminó la actividad porque todos colaboraron con paciencia",
    "Ana leyó que quien busca sabiduría encuentra dirección para vivir",
    "Cada subnivel le enseñó que crecer requiere fe constancia y humildad",
    "Al final comprendió que transformar el carácter empieza con pequeñas decisiones",
    "Ana miró el cielo y prometió usar sus talentos para hacer el bien cada día",

    song_n1_20
    ]; 

// ===================================================
//  FUNCIONES DE DESBLOQUEO
// ===================================================
function getCurrentUserId() {
    try {
        const user = JSON.parse(localStorage.getItem('tq_current_user'));
        return user?.id || user?.correo || 'guest';
    } catch {
        return 'guest';
    }
}

function getProgressKey() {
    return `subsuelo_unlocked_${getCurrentUserId()}`;
}

function getUnlockedLevel() {
    if (window.TypeQuestProgress?.getUnlockedLevel) {
        return window.TypeQuestProgress.getUnlockedLevel(1);
    }

    const key = getProgressKey();
    let u = localStorage.getItem(key);

    if (!u) {
        u = 1;
        localStorage.setItem(key, u);
    }

    return parseInt(u, 10);
}

function setUnlockedLevel(level) {
    if (window.TypeQuestProgress?.saveUnlockedLevel) {
        window.TypeQuestProgress.saveUnlockedLevel(1, level);
        return;
    }

    const key = getProgressKey();

    if (level > getUnlockedLevel()) {
        localStorage.setItem(key, level);
    }
}


// ===================================================
//  ESCENA: SELECTOR DE SUBNIVELES
// ===================================================
class LevelSelect extends Phaser.Scene {
    constructor() { super({ key: 'LevelSelect' }); }

    create() {
        const W = this.scale.width;
        const H = this.scale.height;
        const unlocked = getUnlockedLevel();

        // Limpia cualquier overlay viejo que haya quedado del juego
        document.querySelectorAll('.typing-overlay').forEach(el => el.remove());

        this.add.rectangle(W / 2, H / 2, W, H, 0x1a0a00);

        this.add.text(W / 2, 38, 'NIVEL 1 — TRANSFORMAR EL CARÁCTER', {
            fontSize: '26px', fill: '#e8a060',
            fontFamily: 'Courier New', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(W / 2, 68, 'Cuento de fe valores y crecimiento', {
            fontSize: '13px', fill: '#6a3a10', fontFamily: 'Courier New'
        }).setOrigin(0.5);

        this.add.text(W / 2, 88, 'Selecciona un subnivel', {
            fontSize: '13px', fill: '#555', fontFamily: 'Courier New'
        }).setOrigin(0.5);

        const menuBtn = this.add.text(20, 12, '← Menú', {
            fontSize: '15px', fill: '#aaa', fontFamily: 'Courier New'
        }).setInteractive({ useHandCursor: true });
        menuBtn.on('pointerover', () => menuBtn.setStyle({ fill: '#fff' }));
        menuBtn.on('pointerout',  () => menuBtn.setStyle({ fill: '#aaa' }));
        menuBtn.on('pointerdown', () => window.location.href = '/menu');

        for (let i = 0; i < 20; i++) {
            const sublevel = i + 1;
            const col      = i % 5;
            const row      = Math.floor(i / 5);
            const x        = 130 + col * 135;
            const y        = 155 + row * 100;
            const isActive = sublevel <= unlocked;
            const isSong   = sublevel === 10 || sublevel === 20;
            const bgColor  = isActive ? (isSong ? 0x4d2200 : 0x2d6e1a) : 0x2a2a2a;
            const txtColor = isActive ? '#ffffff' : '#555555';

            const btn = this.add.rectangle(x, y, 110, 60, bgColor)
                .setStrokeStyle(2, isActive ? (isSong ? 0xff8833 : 0x55cc33) : 0x444444);

            if (isActive) {
                btn.setInteractive({ useHandCursor: true });
                btn.on('pointerover', () => btn.setFillStyle(isSong ? 0x6e3300 : 0x3d9e25));
                btn.on('pointerout',  () => btn.setFillStyle(bgColor));
                btn.on('pointerdown', () => {
                    this.scene.start('PlayGame', {
                        sublevel, word: words20[i],
                        timeLimit: isSong ? 240 : 60
                    });
                });
            }

            this.add.text(x, y - 9, `Subnivel ${sublevel}`, {
                fontSize: '13px', fill: txtColor,
                fontFamily: 'Courier New', fontStyle: 'bold'
            }).setOrigin(0.5);

            this.add.text(x, y + 12, isActive ? (isSong ? '🎵 JUGAR' : '▶ JUGAR') : '🔒', {
                fontSize: '11px', fill: isActive ? (isSong ? '#ffaa55' : '#88ff66') : '#444',
                fontFamily: 'Courier New'
            }).setOrigin(0.5);
        }
    }
}


// ===================================================
//  ESCENA: JUEGO
// ===================================================
class PlayGame extends Phaser.Scene {
    constructor() { super({ key: 'PlayGame' }); }

    init(data) {
        this.sublevel     = data.sublevel || 1;
        this.targetText   = data.word || '';
        this.typed        = '';
        this.timeLeft     = data.timeLimit || 60;
        this.initialTime  = this.timeLeft;
        this.finished     = false;
        this.startTime    = null;
        this.timerStarted = false;
        this.timerEvent   = null;
        this.overlay      = null;
        this.inputEl      = null;
        this.phraseEl     = null;
        this.scrollBox    = null;
        this.isSongLevel  = this.sublevel === 10 || this.sublevel === 20;
        this.music        = null;
        this.musicEnabled = true;
        this.soundBtn     = null;
    }

    create() {
        const W = this.scale.width;
        const H = this.scale.height;

        this.add.rectangle(W / 2, H / 2, W, H, 0x1a0a00);

        this.add.text(W / 2, 28, `SUBNIVEL ${this.sublevel} — Subsuelo`, {
            fontSize: '18px', fill: '#e8a060',
            fontFamily: 'Courier New', fontStyle: 'bold'
        }).setOrigin(0.5);

        const back = this.add.text(16, 12, '← Volver', {
            fontSize: '14px', fill: '#aaa', fontFamily: 'Courier New'
        }).setInteractive({ useHandCursor: true });
        back.on('pointerover', () => back.setStyle({ fill: '#fff' }));
        back.on('pointerout',  () => back.setStyle({ fill: '#aaa' }));
        back.on('pointerdown', () => { this.stopMusic(); this.cleanup(); this.scene.start('LevelSelect'); });

        this.timerPhaserText = this.add.text(W - 16, 12, '⏱ Escribe para iniciar', {
            fontSize: '15px', fill: '#888', fontFamily: 'Courier New', fontStyle: 'bold'
        }).setOrigin(1, 0);

        // Botón de sonido solo para niveles con canción
        if (this.isSongLevel) {
            this.soundBtn = this.add.text(W - 110, 12, '🔊', {
                fontSize: '20px', fill: '#ffdd55', fontFamily: 'Courier New'
            }).setInteractive({ useHandCursor: true });

            this.soundBtn.on('pointerdown', () => {
                this.musicEnabled = !this.musicEnabled;
                if (this.musicEnabled) {
                    this.soundBtn.setText('🔊');
                    if (this.music && this.timerStarted && !this.music.isPlaying) this.music.play();
                } else {
                    this.soundBtn.setText('🔇');
                    if (this.music && this.music.isPlaying) this.music.pause();
                }
            });
        }

        this.wpmPhaserText = this.add.text(16, 38, 'WPM: 0', {
            fontSize: '14px', fill: '#66ccff', fontFamily: 'Courier New'
        });
        this.accPhaserText = this.add.text(16, 58, 'Precisión: 100%', {
            fontSize: '14px', fill: '#aaffaa', fontFamily: 'Courier New'
        });

        this.add.text(W / 2, 85, 'Escribe la frase exactamente como aparece:', {
            fontSize: '12px', fill: '#666', fontFamily: 'Courier New'
        }).setOrigin(0.5);

        // Barra de progreso
        this.add.rectangle(W / 2, H - 28, W - 60, 14, 0x2a2a2a).setOrigin(0.5);
        this.progressBar  = this.add.rectangle(30, H - 28, 2, 10, 0x2d6e1a).setOrigin(0, 0.5);
        this.progressMaxW = W - 60;
        this.progressPct  = this.add.text(W / 2, H - 28, '0%', {
            fontSize: '10px', fill: '#888', fontFamily: 'Courier New'
        }).setOrigin(0.5);

        this.hintText = this.add.text(W / 2, H - 60, '🖱 Haz clic en la pantalla para escribir', {
            fontSize: '12px', fill: '#444', fontFamily: 'Courier New'
        }).setOrigin(0.5);

        this.buildHTMLOverlay(W, H);

        // Preparar música según el subnivel canción
        if (this.isSongLevel) {
            const audioKey = this.sublevel === 10 ? 'n1_song1' : 'n1_song2';
            if (this.cache.audio.exists(audioKey)) {
                this.music = this.sound.add(audioKey, { loop: false, volume: 0.5 });
            }
        }
    }

    buildHTMLOverlay(W, H) {
        const canvas = this.game.canvas;
        const rect   = canvas.getBoundingClientRect();
        const scaleX = rect.width / W;

        this.overlay = document.createElement('div');
        this.overlay.className = 'typing-overlay';
        Object.assign(this.overlay.style, {
            position: 'fixed', top: rect.top + 'px', left: rect.left + 'px',
            width: rect.width + 'px', height: rect.height + 'px',
            pointerEvents: 'none', zIndex: '10',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center'
        });

        this.scrollBox = document.createElement('div');
        Object.assign(this.scrollBox.style, {
            background: 'rgba(0,0,0,0.6)', border: '1px solid #3a2000',
            borderRadius: '8px', padding: '20px 26px',
            maxWidth: `${Math.round(680 * scaleX)}px`, width: '85%',
            height:    this.isSongLevel ? `${Math.round(320 * scaleX)}px` : 'auto',
            maxHeight: this.isSongLevel ? `${Math.round(320 * scaleX)}px` : 'none',
            overflowY: 'hidden', overflowX: 'hidden',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.4)'
        });

        this.phraseEl = document.createElement('div');
        Object.assign(this.phraseEl.style, {
            fontFamily: '"Courier New", monospace',
            fontSize:   this.isSongLevel ? `${Math.round(18 * scaleX)}px` : `${Math.round(22 * scaleX)}px`,
            lineHeight: this.isSongLevel ? '1.95' : '1.75',
            textAlign: 'left', letterSpacing: this.isSongLevel ? '1px' : '1.5px',
            wordBreak: 'break-word', whiteSpace: 'pre-wrap', userSelect: 'none',
            transform: 'translateY(0px)', transition: 'transform 0.08s linear'
        });

        this.renderPhrase();
        this.scrollBox.appendChild(this.phraseEl);
        this.overlay.appendChild(this.scrollBox);

        // Input invisible
        this.inputEl = document.createElement('input');
        Object.assign(this.inputEl.style, {
            position: 'fixed', top: '-9999px', left: '-9999px',
            opacity: '0', width: '1px', height: '1px',
            border: 'none', outline: 'none', pointerEvents: 'all'
        });
        this.inputEl.setAttribute('autocomplete',   'off');
        this.inputEl.setAttribute('autocorrect',    'off');
        this.inputEl.setAttribute('autocapitalize', 'none');
        this.inputEl.setAttribute('spellcheck',     'false');
        this.inputEl.addEventListener('input',   () => this.onInput());
        this.inputEl.addEventListener('paste',   e  => e.preventDefault());
        this.inputEl.addEventListener('keydown', e  => { if (this.finished) e.preventDefault(); });

        this.overlay.appendChild(this.inputEl);
        document.body.appendChild(this.overlay);
        setTimeout(() => this.inputEl.focus(), 150);
        this.game.canvas.addEventListener('click', () => this.inputEl.focus());
    }

    renderPhrase() {
        const target = this.targetText;
        const typed  = this.typed;
        let   html   = '';

        for (let i = 0; i < target.length; i++) {
            const ch      = target[i];
            const display = ch === ' ' ? '&nbsp;' : ch;

            if (i < typed.length) {
                html += typed[i] === target[i]
                    ? `<span style="color:#44ff66">${display}</span>`
                    : ch === ' '
                        ? `<span style="color:#ff4444;text-decoration:underline">&nbsp;</span>`
                        : `<span style="color:#ff4444;background:rgba(255,0,0,0.12)">${display}</span>`;
            } else if (i === typed.length) {
                html += `<span style="color:#ffffff;border-bottom:2px solid #ffdd55;padding-bottom:1px">${display}</span>`;
            } else {
                html += `<span style="color:#4a4a4a">${display}</span>`;
            }
        }

        this.phraseEl.innerHTML = html;

        // Scroll automático sincronizado con la música
        if (this.isSongLevel && this.scrollBox && this.phraseEl) {
            const visibleHeight = this.scrollBox.clientHeight;
            const fullHeight    = this.phraseEl.scrollHeight;
            const maxMove       = Math.max(0, fullHeight - visibleHeight);

            let progress = 0;

            if (this.music && this.music.isPlaying && this.music.duration > 0) {
                const delay            = 10;
                const adjustedTime     = Math.max(0, this.music.seek - delay);
                const adjustedDuration = Math.max(1, this.music.duration - delay);
                progress = adjustedTime / adjustedDuration;
            } else {
                progress = target.length > 0 ? typed.length / target.length : 0;
            }

            progress = Phaser.Math.Clamp(progress, 0, 1);
            const slowFactor = 0.20;
            this.phraseEl.style.transform = `translateY(-${maxMove * progress * slowFactor}px)`;
        }
    }

    onInput() {
        if (this.finished) return;
        let raw = this.inputEl.value;
        if (raw.length > this.targetText.length) { raw = raw.slice(0, this.targetText.length); this.inputEl.value = raw; }

        if (!this.timerStarted && raw.length > 0) {
            this.timerStarted = true;
            this.startTime    = Date.now();
            this.timerPhaserText.setText(`⏱ ${this.initialTime}s`);
            this.timerPhaserText.setStyle({ fill: '#ffdd55', fontSize: '18px' });
            this.hintText.setVisible(false);
            this.timerEvent = this.time.addEvent({ delay: 1000, loop: true, callback: this.tickTimer, callbackScope: this });

            // Reproducir canción correcta según subnivel
            if (this.isSongLevel && this.music && this.musicEnabled && !this.music.isPlaying) {
                this.music.play();
            }
        }

        this.typed = raw;
        this.renderPhrase();
        this.updateStats();
        if (this.typed.length === this.targetText.length) this.endGame(this.typed === this.targetText);
    }

    updateStats() {
        const typed  = this.typed;
        const target = this.targetText;
        const pct    = typed.length / target.length;
        this.progressBar.width = Math.max(2, this.progressMaxW * pct);
        this.progressPct.setText(Math.round(pct * 100) + '%');
        if (this.startTime) {
            const mins  = (Date.now() - this.startTime) / 60000;
            const words = typed.trim().split(/\s+/).filter(Boolean).length;
            const wpm   = mins > 0 ? Math.round(words / mins) : 0;
            this.wpmPhaserText.setText(`WPM: ${wpm}`);
        }
        let correct = 0;
        for (let i = 0; i < typed.length; i++) { if (typed[i] === target[i]) correct++; }
        this.accPhaserText.setText(`Precisión: ${typed.length > 0 ? Math.round((correct / typed.length) * 100) : 100}%`);
    }

    tickTimer() {
        if (this.finished) return;
        this.timeLeft--;
        this.timerPhaserText.setText(`⏱ ${this.timeLeft}s`);
        if      (this.timeLeft <= 10) this.timerPhaserText.setStyle({ fill: '#ff4444' });
        else if (this.timeLeft <= 20) this.timerPhaserText.setStyle({ fill: '#ffaa00' });
        if (this.isSongLevel) this.renderPhrase();
        if (this.timeLeft <= 0) this.endGame(false);
    }

    stopMusic() { if (this.music) { this.music.stop(); this.music.destroy(); this.music = null; } }

    endGame(won) {
        if (this.finished) return;
        this.finished = true;
        if (this.timerEvent) this.timerEvent.remove();
        this.stopMusic();
        if (won && this.sublevel < 20) setUnlockedLevel(this.sublevel + 1);

        const typed   = this.typed;
        const target  = this.targetText;
        let   correct = 0;
        for (let i = 0; i < typed.length; i++) { if (typed[i] === target[i]) correct++; }

        const acc      = typed.length > 0 ? Math.round((correct / typed.length) * 100) : 0;
        const elapsed  = this.startTime ? (Date.now() - this.startTime) / 60000 : 1 / 60;
        const words    = typed.trim().split(/\s+/).filter(Boolean).length;
        const wpm      = elapsed > 0 ? Math.round(words / elapsed) : 0;
        const timeUsed = this.initialTime - this.timeLeft;

        if (window.TypeQuestProgress?.saveResult) {
            window.TypeQuestProgress.saveResult({
                nivel: 1,
                subnivel: this.sublevel,
                wpm,
                precision: acc,
                tiempoUsado: timeUsed,
                gano: won
            });
        }

        this.cleanup();
        this.scene.start('ResultScreen', {
            won, acc, wpm, typed, target, sublevel: this.sublevel,
            timeUsed, correct, total: target.length, initialTime: this.initialTime
        });
    }

    cleanup() { this.stopMusic(); if (this.overlay && this.overlay.parentNode) { this.overlay.parentNode.removeChild(this.overlay); this.overlay = null; } }
    shutdown() { this.cleanup(); }
    destroy()  { this.cleanup(); }
}


// ===================================================
//  ESCENA: RESULTADOS
// ===================================================
class ResultScreen extends Phaser.Scene {
    constructor() { super({ key: 'ResultScreen' }); }

    init(data) {
        this.won         = data.won;
        this.acc         = data.acc;
        this.wpm         = data.wpm;
        this.sublevel    = data.sublevel;
        this.timeUsed    = data.timeUsed;
        this.typed       = data.typed;
        this.target      = data.target;
        this.correct     = data.correct;
        this.total       = data.total;
        this.initialTime = data.initialTime || 60;
    }

    create() {
        const W = this.scale.width;
        const H = this.scale.height;

        this.add.rectangle(W / 2, H / 2, W, H, 0x0a0300);

        const pW = 500, pH = 370;
        this.add.rectangle(W / 2, H / 2, pW, pH, 0x160800)
            .setStrokeStyle(2, this.won ? 0x44ff66 : 0xff4444);

        const icon  = this.won ? '🏆' : '⏰';
        const title = this.won ? '¡CARÁCTER FORTALECIDO!' : 'TIEMPO AGOTADO';
        const color = this.won ? '#44ff66' : '#ff4444';

        this.add.text(W / 2, H / 2 - 155, icon,  { fontSize: '36px' }).setOrigin(0.5);
        this.add.text(W / 2, H / 2 - 115, title, {
            fontSize: '30px', fill: color, fontFamily: 'Courier New', fontStyle: 'bold'
        }).setOrigin(0.5);
        this.add.text(W / 2, H / 2 - 82, `Subnivel ${this.sublevel} — Transformar`, {
            fontSize: '14px', fill: '#e8a060', fontFamily: 'Courier New'
        }).setOrigin(0.5);

        this.add.rectangle(W / 2, H / 2 - 62, pW - 60, 1, 0x3a1500);

        [
            ['⌛ Tiempo',    `${this.timeUsed}s de ${this.initialTime}s`],
            ['⚡ Velocidad', `${this.wpm} WPM`],
            ['🎯 Precisión', `${this.acc}%`],
            ['✅ Correctas', `${this.correct} / ${this.total} letras`]
        ].forEach(([lbl, val], i) => {
            const y = H / 2 - 38 + i * 44;
            if (i % 2 === 0) this.add.rectangle(W / 2, y + 8, pW - 60, 34, 0x1e0c00).setOrigin(0.5);
            this.add.text(W / 2 - 180, y, lbl, { fontSize: '15px', fill: '#aaa', fontFamily: 'Courier New' });
            this.add.text(W / 2 + 175, y, val, { fontSize: '15px', fill: '#fff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(1, 0);
        });

        this.add.rectangle(W / 2, H / 2 + 110, pW - 60, 1, 0x3a1500);

        const msg = this.won
            ? (this.acc >= 95 ? 'Tu disciplina refleja integridad y constancia.' : 'Buen trabajo. Cada intento también forma el carácter.')
            : (this.typed.length > this.total * 0.7 ? 'Casi lo logras. La perseverancia también transforma.' : 'No te rindas. Crecer toma práctica y fe.');

        this.add.text(W / 2, H / 2 + 128, msg, {
            fontSize: '12px', fill: '#888', fontFamily: 'Courier New'
        }).setOrigin(0.5);

        const hasNext = this.won && this.sublevel < 20;
        const btnY    = H / 2 + 162;

        if (hasNext) {
            this.makeBtn(W / 2 - 240, btnY, '↺ Reintentar', 0x5c1500, () => {
                const tl = (this.sublevel === 10 || this.sublevel === 20) ? 240 : 60;
                this.scene.start('PlayGame', { sublevel: this.sublevel, word: words20[this.sublevel - 1], timeLimit: tl });
            });
            this.makeBtn(W / 2 - 80, btnY, '☰ Subniveles', 0x1a3d00, () => this.scene.start('LevelSelect'));
            this.makeBtn(W / 2 + 80, btnY, `▶ Sub ${this.sublevel + 1}`, 0x1a5e8a, () => {
                const next = this.sublevel + 1;
                const tl   = (next === 10 || next === 20) ? 240 : 60;
                this.scene.start('PlayGame', { sublevel: next, word: words20[next - 1], timeLimit: tl });
            });
            this.makeBtn(W / 2 + 240, btnY, '🏠 Menú', 0x1a1a1a, () => window.location.href = '/menu');
        } else {
            this.makeBtn(W / 2 - 190, btnY, '↺ Reintentar', 0x5c1500, () => {
                const tl = (this.sublevel === 10 || this.sublevel === 20) ? 240 : 60;
                this.scene.start('PlayGame', { sublevel: this.sublevel, word: words20[this.sublevel - 1], timeLimit: tl });
            });
            this.makeBtn(W / 2, btnY, '☰ Subniveles', 0x1a3d00, () => this.scene.start('LevelSelect'));
            this.makeBtn(W / 2 + 190, btnY, '🏠 Menú', 0x1a1a1a, () => window.location.href = '/menu');
        }
    }

    makeBtn(x, y, label, bg, cb, w = 140) {
        const btn = this.add.rectangle(x, y, w, 44, bg)
            .setInteractive({ useHandCursor: true })
            .setStrokeStyle(1, 0xffffff33);
        this.add.text(x, y, label, { fontSize: '13px', fill: '#fff', fontFamily: 'Courier New', fontStyle: 'bold' }).setOrigin(0.5);
        btn.on('pointerover', () => btn.setAlpha(0.75));
        btn.on('pointerout',  () => btn.setAlpha(1));
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
        backgroundColor: '#1a0a00',
        scene: [Preload, LevelSelect, PlayGame, ResultScreen]
    });
};
