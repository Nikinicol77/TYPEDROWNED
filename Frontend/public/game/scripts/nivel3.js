// ===================================================
//  nivel3.js — Nivel 3: Servir con esperanza
//  Objetivo: 70 WPM
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
const song_n3_10 = `Densas penumbras invaden el largo camino
Que hemos osado un día seguir
Con rumbo al cielo
Y muchos son los que pierden el rumbo cargados
En la noche oscura de su distracción
Asfixiando el tiempo
Es momento de alzar
Nuestros faros y brillar

Levántate y resplandece toma el yelmo de la salvación
Llena tu lampara con aceite y ven conmigo
Grande es la viña y pocos son los obreros dispuestos a ir
Dios te acompañará, te sostendrá

La humana naturaleza nos hace tan frágil
Que a veces el miedo nos quiere tomar
Sigamos valientes
Podemos confiar en un Dios que nos cuida y nos guarda
Protege y sustenta en medio del mal
Nos da de su gracia
Es momento de alzar
Nuestros faros y brillar

Levántate y resplandece toma el yelmo de la salvación
Llena tu lampara con aceite y ven conmigo
Grande es la viña y pocos son los obreros dispuestos a ir
Dios te acompañará

Levántate y resplandece toma el yelmo de la salvación
Llena tu lampara con aceite y ven conmigo
Grande es la viña y pocos son los obreros dispuestos a ir
Dios te acompañará, te sostendrá
Dios te acompañará, te sostendrá`;

const song_n3_20 = `Ven señor, transfórmame en tu siervo
Ven, renueva cada pensamiento
Ven, perdona mis errores
Ven y sana mis dolores
Ven, quita mis temores
Para que en libertad te adore

Señor transfórmame es mi deseo
Crea en mí un corazón nuevo
Que guarde tesoros en el cielo
Dios transfórmame y lávame entero
Solo tu sangre tiene el poder de purificar
Transfórmame

Ven señor y llévame a tu encuentro
Ven, sé fuego y nube en el desierto
Ven, cambia mi historia
Ven y dame la victoria
Ven yo quiero ver tu gloria
Y que se grabe en mi memoria

Señor transfórmame es mi deseo
Crea en mí un corazón nuevo
Que guarde tesoros en el cielo
Dios transfórmame y lávame entero
Solo tu sangre tiene el poder de purificar
Transfórmame

Señor transfórmame es mi deseo
Crea en mí un corazón nuevo
Que guarde tesoros en el cielo
Dios transfórmame y lávame entero
Solo tu sangre tiene el poder de purificar
Transfórmame, transfórmame, transfórmame`;


// ===================================================
//  PRELOAD
//  Carga el audio antes de entrar al juego.
//  OJO: como nivel3.html está en /template,
//  la ruta correcta es ../assets/audio/...
// ===================================================
class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload' });
    }

    preload() {
        // Canción subnivel 10
        this.load.audio('n3_song1', '/game/audio/cancion5.mp3');

        // Canción subnivel 20
        this.load.audio('n3_song2', '/game/audio/cancion6.mp3');
    }

    create() {
        this.scene.start('LevelSelect');
    }
}


// ===================================================
//  LISTA DE FRASES DEL NIVEL 3
//  Sub 10 y 20 son canciones
// ===================================================
    const words20_n3 = [
    "La formación integral, entendida como articulación entre conocimiento, carácter y servicio, exige una comprensión ética de la responsabilidad profesional.",
    "En contextos educativos cristianos, la esperanza no se reduce a optimismo emocional; funciona como principio orientador de acción solidaria y perseverante.",
    "El servicio, cuando se fundamenta en la dignidad humana, supera la asistencia inmediata y promueve procesos sostenibles de transformación comunitaria.",
    "Una tesis con impacto social requiere problema delimitado, justificación pertinente, objetivos medibles y metodología coherente con la realidad estudiada.",
    "La excelencia académica adquiere sentido trascendente cuando el investigador reconoce que sus hallazgos deben beneficiar a personas concretas.",
    "La ética del cuidado demanda evaluar consecuencias, proteger información sensible y evitar decisiones técnicas que aumenten la vulnerabilidad social.",
    "El liderazgo con esperanza integra pensamiento crítico, humildad intelectual y disposición para escuchar a quienes experimentan directamente el problema.",
    "La innovación responsable se sostiene en evidencias; sin embargo, también necesita compasión, prudencia y compromiso con el bien común.",
    "Antes de intervenir una comunidad, el investigador debe comprender su historia, sus necesidades y sus recursos, evitando imponer soluciones externas.",
    song_n3_10,

    "El marco teórico permite relacionar conceptos, antecedentes y principios, con el fin de sustentar una propuesta de servicio rigurosa y pertinente.",
    "La recolección de datos exige consentimiento informado, confidencialidad y transparencia, especialmente cuando la investigación involucra experiencias personales.",
    "Los resultados deben interpretarse con honestidad académica; exagerar hallazgos, omitir limitaciones o manipular conclusiones contradice la integridad investigativa.",
    "Servir con esperanza implica reconocer el dolor ajeno sin perder la convicción de que es posible construir alternativas de mejora.",
    "Una propuesta de intervención debe incluir seguimiento, evaluación y sostenibilidad, porque el servicio responsable no termina con la entrega inicial.",
    "La discusión académica compara resultados con fuentes previas, identifica aportes originales y plantea nuevas preguntas para futuras investigaciones.",
    "La dimensión espiritual del servicio recuerda que la vocación profesional puede convertirse en una respuesta concreta de amor al prójimo.",
    "El investigador concluye que aprender, crear y servir no son tareas separadas, sino expresiones complementarias de una vida con propósito.",
    "Finalmente, el proyecto demuestra que la esperanza activa transforma la dificultad en compromiso, y el conocimiento en oportunidad para bendecir a otros.",
    song_n3_20
    ];

// ===================================================
//  FUNCIONES DE DESBLOQUEO
// ===================================================
function getCurrentUserId_n3() {
    try {
        const user = JSON.parse(localStorage.getItem('tq_current_user'));
        return user?.id || user?.correo || 'guest';
    } catch {
        return 'guest';
    }
}

function getProgressKey_n3() {
    return `n3_max_${getCurrentUserId_n3()}`;
}

function getUnlockedLevel_n3() {
    if (window.TypeQuestProgress?.getUnlockedLevel) {
        return window.TypeQuestProgress.getUnlockedLevel(3);
    }

    const key = getProgressKey_n3();
    let unlocked = localStorage.getItem(key);

    if (!unlocked) {
        unlocked = 1;
        localStorage.setItem(key, unlocked);
    } else {
        unlocked = parseInt(unlocked, 10);
    }

    return unlocked;
}

function setUnlockedLevel_n3(level) {
    if (window.TypeQuestProgress?.saveUnlockedLevel) {
        window.TypeQuestProgress.saveUnlockedLevel(3, level);
        return;
    }

    const key = getProgressKey_n3();
    const current = getUnlockedLevel_n3();

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
        const unlocked = getUnlockedLevel_n3();

        // Limpia overlays viejos si quedaron abiertos
        document.querySelectorAll('.typing-overlay').forEach(el => el.remove());

        this.add.rectangle(W / 2, H / 2, W, H, 0x00001a);

        // Estrellas decorativas
        const g = this.add.graphics();
        g.fillStyle(0xffffff, 0.5);
        for (let i = 0; i < 60; i++) {
            g.fillCircle(Math.random() * 800, Math.random() * 600, Math.random() < 0.7 ? 1 : 1.5);
        }

        this.add.text(W / 2, 38, 'NIVEL 3 — SERVIR CON ESPERANZA', {
            fontSize: '26px',
            fill: '#a0a8ff',
            fontFamily: 'Courier New',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(W / 2, 68, 'Objetivo: 70 WPM · tesis, esperanza y servicio', {
            fontSize: '13px',
            fill: '#4a4a8a',
            fontFamily: 'Courier New'
        }).setOrigin(0.5);

        this.add.text(W / 2, 88, 'Selecciona un subnivel', {
            fontSize: '13px',
            fill: '#444',
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
            const bgColor = isActive ? (isSong ? 0x1a1a6e : 0x1a1a5e) : 0x1a1a1a;
            const txtColor = isActive ? '#a0a8ff' : '#444444';

            const btn = this.add.rectangle(x, y, 110, 60, bgColor)
                .setStrokeStyle(2, isActive ? (isSong ? 0xccccff : 0x6666ff) : 0x333333);

            if (isActive) {
                btn.setInteractive({ useHandCursor: true });
                btn.on('pointerover', () => btn.setFillStyle(isSong ? 0x3a3a9e : 0x2a2a8e));
                btn.on('pointerout', () => btn.setFillStyle(bgColor));

                btn.on('pointerdown', () => {
                    const timeLimit = isSong ? 240 : 60;

                    this.scene.start('PlayGame', {
                        sublevel,
                        word: words20_n3[i],
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
                fill: isActive ? '#a0a8ff' : '#333',
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

        this.add.rectangle(W / 2, H / 2, W, H, 0x00001a);

        // Estrellas decorativas
        const g = this.add.graphics();
        g.fillStyle(0xffffff, 0.4);
        for (let i = 0; i < 80; i++) {
            g.fillCircle(Math.random() * 800, Math.random() * 600, Math.random() < 0.7 ? 1 : 1.5);
        }

        this.add.text(W / 2, 28, `SUBNIVEL ${this.sublevel} — Luna | Meta: 70 WPM`, {
            fontSize: '16px',
            fill: '#a0a8ff',
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
            fill: '#555',
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
            fill: '#aaaaff',
            fontFamily: 'Courier New'
        });

        this.add.text(W - 16, 38, '🎯 Meta: 70 WPM', {
            fontSize: '13px',
            fill: '#4a4a8a',
            fontFamily: 'Courier New'
        }).setOrigin(1, 0);

        this.add.text(W / 2, 82, 'Escribe la frase exactamente como aparece:', {
            fontSize: '12px',
            fill: '#444',
            fontFamily: 'Courier New'
        }).setOrigin(0.5);

        // Barra de progreso
        this.add.rectangle(W / 2, H - 28, W - 60, 14, 0x0a0a2a).setOrigin(0.5);
        this.progressBar = this.add.rectangle(30, H - 28, 2, 10, 0x4444cc).setOrigin(0, 0.5);
        this.progressMaxW = W - 60;

        this.progressPct = this.add.text(W / 2, H - 28, '0%', {
            fontSize: '10px',
            fill: '#555',
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
            const audioKey = this.sublevel === 10 ? 'n3_song1' : 'n3_song2';

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
            background: 'rgba(0,0,10,0.75)',
            border: '1px solid #1a1a4e',
            borderRadius: '8px',
            padding: '22px 28px',
            maxWidth: `${Math.round(720 * scaleX)}px`,
            width: '90%',
            height: this.isSongLevel ? `${Math.round(320 * scaleX)}px` : 'auto',
            maxHeight: this.isSongLevel ? `${Math.round(320 * scaleX)}px` : 'none',
            overflowY: 'hidden',
            overflowX: 'hidden',
            boxShadow: 'inset 0 0 24px rgba(0,0,30,0.6)'
        });

        this.phraseEl = document.createElement('div');
        Object.assign(this.phraseEl.style, {
            fontFamily: '"Courier New", monospace',
            fontSize: `${Math.round(18 * scaleX)}px`,
            lineHeight: this.isSongLevel ? '1.95' : '1.9',
            textAlign: 'left',
            letterSpacing: '1px',
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
                    ? `<span style="color:#8888ff">${display}</span>`
                    : ch === ' '
                        ? `<span style="color:#ff4444;text-decoration:underline">&nbsp;</span>`
                        : `<span style="color:#ff4444;background:rgba(255,0,0,0.12)">${display}</span>`;
            } else if (i === typed.length) {
                html += `<span style="color:#fff;border-bottom:2px solid #a0a8ff;padding-bottom:1px">${display}</span>`;
            } else {
                html += `<span style="color:#2a2a4a">${display}</span>`;
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

            const slowFactor = 0.65;
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
                fill: wpm >= 70 ? '#8888ff' : wpm >= 50 ? '#ffdd55' : '#66ccff'
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
            setUnlockedLevel_n3(this.sublevel + 1);
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
                nivel: 3,
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

        this.add.rectangle(W / 2, H / 2, W, H, 0x00000f);

        // Estrellas decorativas
        const g = this.add.graphics();
        g.fillStyle(0xffffff, 0.3);
        for (let i = 0; i < 60; i++) {
            g.fillCircle(Math.random() * 800, Math.random() * 600, 1);
        }

        const pW = 520;
        const pH = 400;

        this.add.rectangle(W / 2, H / 2, pW, pH, 0x05051a)
            .setStrokeStyle(2, this.won ? 0xa0a8ff : 0xff4444);

        const metaOk = this.wpm >= 70;
        const icon = this.won ? (metaOk ? '🌙' : '✅') : '⏰';
        const title = this.won ? (metaOk ? '¡SERVICIO CON ESPERANZA!' : '¡TESIS COMPLETA!') : 'TIEMPO AGOTADO';
        const color = this.won ? (metaOk ? '#a0a8ff' : '#ffdd55') : '#ff4444';

        this.add.text(W / 2, H / 2 - 165, icon, {
            fontSize: '36px'
        }).setOrigin(0.5);

        this.add.text(W / 2, H / 2 - 125, title, {
            fontSize: '26px',
            fill: color,
            fontFamily: 'Courier New',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(W / 2, H / 2 - 92, `Subnivel ${this.sublevel} — Servir`, {
            fontSize: '14px',
            fill: '#a0a8ff',
            fontFamily: 'Courier New'
        }).setOrigin(0.5);

        this.add.text(W / 2, H / 2 - 72,
            `${this.wpm} WPM ${metaOk ? '✓ Meta alcanzada' : '✗ Meta: 70 WPM'}`, {
                fontSize: '14px',
                fill: metaOk ? '#a0a8ff' : '#ff8844',
                fontFamily: 'Courier New',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        this.add.rectangle(W / 2, H / 2 - 55, pW - 60, 1, 0x1a1a4e);

        [
            ['⌛ Tiempo', `${this.timeUsed}s de ${this.initialTime}s`],
            ['⚡ Velocidad', `${this.wpm} WPM`],
            ['🎯 Precisión', `${this.acc}%`],
            ['✅ Correctas', `${this.correct} / ${this.total} letras`]
        ].forEach(([lbl, val], i) => {
            const y = H / 2 - 32 + i * 42;

            if (i % 2 === 0) {
                this.add.rectangle(W / 2, y + 8, pW - 60, 32, 0x0a0a28).setOrigin(0.5);
            }

            this.add.text(W / 2 - 190, y, lbl, {
                fontSize: '14px',
                fill: '#888',
                fontFamily: 'Courier New'
            });

            this.add.text(W / 2 + 185, y, val, {
                fontSize: '14px',
                fill: '#fff',
                fontFamily: 'Courier New',
                fontStyle: 'bold'
            }).setOrigin(1, 0);
        });

        this.add.rectangle(W / 2, H / 2 + 108, pW - 60, 1, 0x1a1a4e);

        this.add.text(
            W / 2,
            H / 2 + 126,
            this.won
                ? (metaOk ? 'Servir con esperanza deja una huella que permanece.' : 'Completaste el reto; sigue creciendo en excelencia y esperanza.')
                : 'Sigue practicando: la esperanza sostiene el propósito incluso en la dificultad.',
            {
                fontSize: '12px',
                fill: '#555',
                fontFamily: 'Courier New'
            }
        ).setOrigin(0.5);

        const hasNext = this.won && this.sublevel < 20;
        const btnY = H / 2 + 162;

        if (hasNext) {
            this.makeBtn(W / 2 - 240, btnY, '↺ Reintentar', 0x1a1a5e, () => {
                const tl = (this.sublevel === 10 || this.sublevel === 20) ? 240 : 60;
                this.scene.start('PlayGame', {
                    sublevel: this.sublevel,
                    word: words20_n3[this.sublevel - 1],
                    timeLimit: tl
                });
            });

            this.makeBtn(W / 2 - 80, btnY, '☰ Subniveles', 0x0d0d3a, () => {
                this.scene.start('LevelSelect');
            });

            this.makeBtn(W / 2 + 80, btnY, `▶ Sub ${this.sublevel + 1}`, 0x1a2a6e, () => {
                const next = this.sublevel + 1;
                const tl = (next === 10 || next === 20) ? 240 : 60;

                this.scene.start('PlayGame', {
                    sublevel: next,
                    word: words20_n3[next - 1],
                    timeLimit: tl
                });
            });

            this.makeBtn(W / 2 + 240, btnY, '🏠 Menú', 0x1a1a1a, () => {
                window.location.href = '/menu';
            });
        } else {
            this.makeBtn(W / 2 - 190, btnY, '↺ Reintentar', 0x1a1a5e, () => {
                const tl = (this.sublevel === 10 || this.sublevel === 20) ? 240 : 60;
                this.scene.start('PlayGame', {
                    sublevel: this.sublevel,
                    word: words20_n3[this.sublevel - 1],
                    timeLimit: tl
                });
            });

            this.makeBtn(W / 2, btnY, '☰ Subniveles', 0x0d0d3a, () => {
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
        backgroundColor: '#00000f',
        scene: [Preload, LevelSelect, PlayGame, ResultScreen]
    });
};