'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, BookOpen, Check, ChevronRight, Code2, Flame, LockKeyhole, Play, Shield, Sparkles, Swords, Terminal, Trophy, Zap } from 'lucide-react'

type Track = 'python' | 'cpp'
type Quest = { id: string; track: Track; chapter: string; title: string; subtitle: string; xp: number; level: string; lesson: string; code: string; task: string; starter: string; checks: string[]; question: string; answers: string[]; correct: number; reward: string }

const quests: Quest[] = [
  { id: 'py-1', track: 'python', chapter: '01', title: 'The First Spark', subtitle: 'Your first lines of Python', xp: 100, level: 'INITIATE', lesson: 'Every journey begins with a single instruction. Python is a language that lets you give clear commands to a computer. The print() function displays information on the screen.', code: 'print("Hello, adventurer!")', task: 'Write a line of Python that prints the words Hello, world!', starter: '# Your first spell goes here\n', checks: ['print', 'hello', 'world'], question: 'Which Python function displays text in the terminal?', answers: ['show()', 'print()', 'echo()', 'writeLine()'], correct: 1, reward: 'Spark of Syntax' },
  { id: 'py-2', track: 'python', chapter: '02', title: 'The Memory Vault', subtitle: 'Variables and data', xp: 150, level: 'APPRENTICE', lesson: 'Variables are named containers for information. Store a value once, then use its name whenever you need it. Python figures out the data type for you.', code: 'hero = "Arin"\nlevel = 1\nprint(hero, level)', task: 'Create a variable named hero and assign it the string "Arin".', starter: '# Store your hero name\n', checks: ['hero', '=', 'arin'], question: 'What does a variable do?', answers: ['Repeats a loop', 'Stores a value', 'Deletes a file', 'Compiles code'], correct: 1, reward: 'Memory Rune' },
  { id: 'py-3', track: 'python', chapter: '03', title: 'The Trial of Choice', subtitle: 'Make decisions with if / else', xp: 200, level: 'ADEPT', lesson: 'Programs can make decisions. An if statement runs a block when a condition is true; else handles the other path. Indentation defines the blocks in Python.', code: 'health = 30\nif health > 0:\n    print("Keep going!")\nelse:\n    print("Game over")', task: 'Write an if statement that checks whether health is greater than 0.', starter: 'health = 30\n# Make your choice\n', checks: ['if', 'health', '>'], question: 'Which keyword handles the alternative branch?', answers: ['otherwise', 'elseif', 'else', 'then'], correct: 2, reward: 'Choicekeeper Badge' },
  { id: 'cpp-1', track: 'cpp', chapter: '01', title: 'Forge Your First Program', subtitle: 'Meet the C++ machine', xp: 100, level: 'INITIATE', lesson: 'C++ is a compiled language. A basic program starts with the iostream library and a main() function. std::cout sends text to the console.', code: '#include <iostream>\nint main() {\n    std::cout << "Hello, adventurer!";\n    return 0;\n}', task: 'Add a std::cout statement that prints Hello, world!', starter: '#include <iostream>\nint main() {\n    // Your code here\n    return 0;\n}\n', checks: ['std::cout', 'hello', 'world'], question: 'Which function is the usual entry point of a C++ program?', answers: ['start()', 'main()', 'run()', 'init()'], correct: 1, reward: 'First Flame' },
  { id: 'cpp-2', track: 'cpp', chapter: '02', title: 'The Variable Forge', subtitle: 'Types and values', xp: 150, level: 'APPRENTICE', lesson: 'C++ asks you to declare a type. int stores whole numbers, double stores decimal numbers, and std::string stores text (with the string header).', code: 'int level = 1;\ndouble health = 95.5;\nchar rank = \'A\';', task: 'Declare an integer variable named score and set it to 100.', starter: '#include <iostream>\nint main() {\n    // Declare score here\n    return 0;\n}\n', checks: ['int', 'score', '100'], question: 'Which type is best for a whole number?', answers: ['int', 'double', 'char', 'bool'], correct: 0, reward: 'Iron Syntax' },
  { id: 'cpp-3', track: 'cpp', chapter: '03', title: 'The Branching Path', subtitle: 'Conditions in C++', xp: 200, level: 'ADEPT', lesson: 'Use if and else to let your program choose what to do. Conditions evaluate to true or false, and braces group the instructions for each path.', code: 'int health = 30;\nif (health > 0) {\n    std::cout << "Keep going!";\n} else {\n    std::cout << "Game over";\n}', task: 'Write an if condition that checks whether health is greater than 0.', starter: 'int health = 30;\n// Add your if condition\n', checks: ['if', 'health', '>'], question: 'What does an if condition evaluate to?', answers: ['A string', 'A true or false value', 'A file', 'A loop'], correct: 1, reward: 'Pathfinder Crest' },
]

export default function AcademyHome() {
  const [track, setTrack] = useState<Track>('python')
  const [activeId, setActiveId] = useState('py-1')
  const [completed, setCompleted] = useState<string[]>([])
  const [draft, setDraft] = useState(quests[0].starter)
  const [answer, setAnswer] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [notice, setNotice] = useState('')
  const [showLesson, setShowLesson] = useState(true)

  useEffect(() => {
    try { const saved = localStorage.getItem('codebound-progress'); if (saved) setCompleted(JSON.parse(saved)) } catch {}
  }, [])
  useEffect(() => { try { localStorage.setItem('codebound-progress', JSON.stringify(completed)) } catch {} }, [completed])

  const trackQuests = useMemo(() => quests.filter(q => q.track === track), [track])
  const active = quests.find(q => q.id === activeId) ?? trackQuests[0]
  const doneInTrack = trackQuests.filter(q => completed.includes(q.id)).length
  const totalXp = quests.filter(q => completed.includes(q.id)).reduce((sum, q) => sum + q.xp, 0)
  const unlockedIndex = trackQuests.findIndex(q => !completed.includes(q.id))
  const activeIndex = trackQuests.findIndex(q => q.id === active.id)
  const isLocked = activeIndex > Math.max(unlockedIndex, trackQuests.length - 1)
  const progress = Math.round(doneInTrack / trackQuests.length * 100)

  function chooseTrack(next: Track) {
    setTrack(next); const first = quests.find(q => q.track === next)!; setActiveId(first.id); setDraft(first.starter); setAnswer(null); setChecked(false); setNotice(''); setShowLesson(true)
  }
  function chooseQuest(q: Quest) {
    setActiveId(q.id); setDraft(q.starter); setAnswer(null); setChecked(false); setNotice(''); setShowLesson(true)
  }
  function submitCode() {
    const normalized = draft.toLowerCase().replaceAll('"', '').replaceAll("'", '')
    if (active.checks.every(token => normalized.includes(token))) setNotice('CODE ACCEPTED — your spell works. Answer the knowledge check to claim XP.')
    else setNotice('Not quite yet. Check the lesson and make sure your code includes the required pieces.')
  }
  function claimReward() {
    if (!active.checks.every(token => draft.toLowerCase().replaceAll('"', '').replaceAll("'", '').includes(token))) { setNotice('Complete the code challenge first.'); return }
    if (answer !== active.correct) { setNotice('The knowledge check is not correct yet. Give it another try.'); return }
    if (!completed.includes(active.id)) setCompleted(prev => [...prev, active.id])
    setChecked(true); setNotice('QUEST COMPLETE — XP added to your profile!')
  }
  const codePassed = active.checks.every(token => draft.toLowerCase().replaceAll('"', '').replaceAll("'", '').includes(token))
  const rank = totalXp >= 1000 ? 'CODE WARDEN' : totalXp >= 500 ? 'RUNE KNIGHT' : totalXp >= 200 ? 'PATHFINDER' : 'NEW ARRIVAL'

  return (
    <main className="cb-shell">
      <div className="cb-grain" />
      <header className="cb-topbar">
        <a className="cb-logo" href="#top"><span className="cb-logo-mark">C<span>✦</span></span><span>CODEBOUND<small>ASCENSION PROTOCOL</small></span></a>
        <nav className="cb-nav"><a href="#paths">Learning paths</a><a href="#quests">Quest board</a><a href="#codex">The codex</a></nav>
        <div className="cb-player"><span className="cb-avatar">S</span><span>PLAYER ONE<small>{rank}</small></span></div>
      </header>

      <section className="cb-hero" id="top">
        <div className="cb-hero-copy">
          <div className="cb-kicker"><span /> THE WORLD IS YOURS TO COMPILE</div>
          <h1>Learn to code.<br /><em>Become legend.</em></h1>
          <p>A hands-on coding adventure. Master Python or C++, conquer quests, collect knowledge, and build the skills to shape your own worlds.</p>
          <div className="cb-hero-actions"><a className="cb-primary" href="#paths">BEGIN YOUR JOURNEY <ArrowRight size={16} /></a><span><Shield size={15} /> NO EXPERIENCE REQUIRED</span></div>
          <div className="cb-hero-stats"><div><strong>{totalXp.toLocaleString()}</strong><span>TOTAL XP</span></div><div><strong>{completed.length}<i> / 6</i></strong><span>QUESTS CLEARED</span></div><div><strong>{rank}</strong><span>CURRENT RANK</span></div></div>
        </div>
        <div className="cb-hero-art" aria-label="Fantasy game landscape illustration" role="img"><div className="cb-sun" /><div className="cb-moon" /><div className="cb-mountain cb-mountain-back" /><div className="cb-mountain cb-mountain-front" /><div className="cb-ruin"><span /><span /><span /></div><div className="cb-art-caption">SECTOR 01 <b>THE FORGOTTEN REALM</b></div><div className="cb-art-orbit" /></div>
        <div className="cb-scroll">SCROLL TO EXPLORE <span /></div>
      </section>

      <section className="cb-paths" id="paths">
        <div className="cb-section-heading"><div><span className="cb-index">01 / CHOOSE YOUR DISCIPLINE</span><h2>Two paths.<br /><em>One destination.</em></h2></div><p>Every master starts somewhere. Pick your language and begin forging your skills one quest at a time.</p></div>
        <div className="cb-path-grid">
          <button className={`cb-path-card cb-python ${track === 'python' ? 'is-selected' : ''}`} onClick={() => chooseTrack('python')}>
            <span className="cb-path-top"><span>PATH OF THE SERPENT</span><span className="cb-path-symbol">Py</span></span><div className="cb-path-emblem">⌘</div><h3>Python</h3><p>Learn the language of automation, AI, data, and creative problem-solving. Clear, expressive, powerful.</p><span className="cb-path-meta">3 CHAPTERS <i>·</i> BEGINNER FRIENDLY</span><span className="cb-path-cta">{track === 'python' ? 'CURRENT PATH' : 'CHOOSE THIS PATH'} <ArrowRight size={15} /></span>
          </button>
          <button className={`cb-path-card cb-cpp ${track === 'cpp' ? 'is-selected' : ''}`} onClick={() => chooseTrack('cpp')}>
            <span className="cb-path-top"><span>PATH OF THE FORGE</span><span className="cb-path-symbol">C++</span></span><div className="cb-path-emblem">⌬</div><h3>C++</h3><p>Understand how software works closer to the machine. Build foundations for games, systems, and performance.</p><span className="cb-path-meta">3 CHAPTERS <i>·</i> BEGINNER FRIENDLY</span><span className="cb-path-cta">{track === 'cpp' ? 'CURRENT PATH' : 'CHOOSE THIS PATH'} <ArrowRight size={15} /></span>
          </button>
        </div>
      </section>

      <section className="cb-journey" id="quests">
        <div className="cb-section-heading"><div><span className="cb-index">02 / YOUR ADVENTURE LOG</span><h2>The quest<br /><em>board.</em></h2></div><p>Learn a concept, write a little code, pass the trial. Every cleared quest brings you closer to mastery.</p></div>
        <div className="cb-game-layout">
          <aside className="cb-quest-list">
            <div className="cb-quest-list-head"><span>CHAPTERS / {track.toUpperCase()}</span><span>{doneInTrack}/{trackQuests.length}</span></div>
            <div className="cb-progress-track"><span style={{ width: progress + '%' }} /></div>
            {trackQuests.map((q, i) => {
              const done = completed.includes(q.id)
              const locked = i > 0 && !completed.includes(trackQuests[i - 1].id)
              return <button key={q.id} className={`cb-quest-item ${active.id === q.id ? 'active' : ''} ${done ? 'done' : ''}`} onClick={() => !locked && chooseQuest(q)} disabled={locked}>
                <span className="cb-quest-number">{done ? <Check size={14} /> : locked ? <LockKeyhole size={13} /> : q.chapter}</span><span className="cb-quest-name"><b>{q.title}</b><small>{q.subtitle}</small></span><span className="cb-quest-xp">{done ? 'CLEAR' : q.xp + ' XP'}</span>
              </button>
            })}
            <div className="cb-side-note"><Sparkles size={15} /><span>YOUR PROGRESS IS SAVED ON THIS DEVICE.</span></div>
          </aside>
          <article className="cb-quest-detail">
            <div className="cb-detail-top"><span><Swords size={14} /> MAIN QUEST / {active.level}</span><span><Zap size={14} /> {active.xp} XP</span></div>
            <div className="cb-detail-title"><span>CHAPTER {active.chapter}</span><h3>{active.title}</h3><p>{active.subtitle}</p></div>
            <div className="cb-lesson"><div className="cb-lesson-head"><span><BookOpen size={15} /> FIELD NOTES</span><button onClick={() => setShowLesson(v => !v)}>{showLesson ? 'COLLAPSE' : 'READ LESSON'}</button></div>{showLesson && <><p>{active.lesson}</p><div className="cb-example"><div><span>EXAMPLE / {track.toUpperCase()}</span><Code2 size={15} /></div><pre><code>{active.code}</code></pre></div></>}</div>
            <div className="cb-challenge"><div className="cb-challenge-head"><span><Terminal size={15} /> THE TRIAL / WRITE CODE</span><span>EDITOR</span></div><p>{active.task}</p><textarea spellCheck={false} value={draft} onChange={e => { setDraft(e.target.value); setNotice(''); setChecked(false) }} aria-label="Code challenge editor" /><div className="cb-editor-foot"><span>{track === 'python' ? 'PYTHON 3' : 'C++17'} <i>·</i> LOCAL PRACTICE</span><button onClick={submitCode}><Play size={13} /> CHECK CODE</button></div>{notice && <div className={`cb-notice ${codePassed ? 'good' : ''}`}>{notice}</div>}</div>
            <div className="cb-knowledge"><span className="cb-index">KNOWLEDGE CHECK / ONE QUESTION</span><h4>{active.question}</h4><div className="cb-answer-grid">{active.answers.map((a, i) => <button key={a} className={answer === i ? 'picked' : ''} onClick={() => { setAnswer(i); setNotice('') }}><span>{String.fromCharCode(65 + i)}</span>{a}</button>)}</div><div className="cb-claim-row"><span>{completed.includes(active.id) ? <><Check size={14} /> QUEST ALREADY CLEARED</> : <><Trophy size={14} /> REWARD: {active.reward}</>}</span><button className="cb-claim" onClick={claimReward} disabled={completed.includes(active.id)}>{completed.includes(active.id) ? 'COMPLETED' : 'CLAIM XP'} <ArrowRight size={14} /></button></div></div>
          </article>
        </div>
      </section>

      <section className="cb-codex" id="codex"><div className="cb-codex-art"><div className="cb-codex-ring" /><div className="cb-codex-book">⌘</div><span>THE CODEX / VOL. I</span></div><div className="cb-codex-copy"><span className="cb-index">03 / THE PHILOSOPHY</span><h2>Knowledge is<br /><em>your greatest weapon.</em></h2><p>Real progress comes from practice. This world is designed to make the fundamentals feel like an adventure — one small victory, one new concept, one working program at a time.</p><div className="cb-principles"><span><Flame size={16} /> LEARN BY DOING</span><span><Code2 size={16} /> WRITE REAL CODE</span><span><Trophy size={16} /> EARN YOUR PROGRESS</span></div></div></section>
      <footer className="cb-footer"><a className="cb-logo" href="#top"><span className="cb-logo-mark">C<span>✦</span></span><span>CODEBOUND<small>ASCENSION PROTOCOL</small></span></a><span>FOR THE CURIOUS. BUILT FOR THE BOLD.</span><a href="#top">RETURN TO THE SURFACE ↑</a><small>© {new Date().getFullYear()} CODEBOUND / ASCENSION</small></footer>
    </main>
  )
}
