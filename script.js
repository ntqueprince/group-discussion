let currentChapter = 0;

const answers = [
    "नियंत्रण एवं समन्वय वह प्रक्रिया है जिससे हमारा शरीर सभी कार्यों को व्यवस्थित करता है। इसमें तंत्रिका तंत्र बिजली के संकेतों से तेज़ी से काम करता है, और अंतःस्रावी तंत्र हार्मोन से धीरे-धीरे काम करता है। प्रतिवर्ती क्रियाएं स्वचालित होती हैं।",
    "जनन वह प्रक्रिया है जिससे जीव अपने जैसे नए जीव पैदा करते हैं। अलैंगिक जनन में एक जीव से नया जीव बनता है, लैंगिक जनन में नर-मादा दोनों चाहिए। लैंगिक जनन से विविधता आती है।",
    "अनुवांशिकता से माता-पिता के गुण बच्चों में जाते हैं। DNA और genes इसके लिए ज़िम्मेदार हैं। मनुष्य में 46 chromosomes होते हैं। बच्चे का लिंग पिता के X या Y chromosome से तय होता है।"
];

function showChapter(index) {
    document.querySelectorAll('.chapter').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
    document.getElementById('chapter' + index).classList.add('active');
    document.querySelectorAll('.tab-btn')[index].classList.add('active');
    currentChapter = index;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleContent(id) {
    const el = document.getElementById(id);
    el.classList.toggle('show');
}

function selectOption(el) {
    const parent = el.closest('.quiz-question');
    parent.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
}

function checkQuiz(chapterIndex) {
    const chapter = document.getElementById('chapter' + chapterIndex);
    const questions = chapter.querySelectorAll('.quiz-question');
    let correct = 0;

    questions.forEach(q => {
        const selected = q.querySelector('.quiz-option.selected');
        q.querySelectorAll('.quiz-option').forEach(o => {
            o.classList.remove('correct', 'wrong');
            if (o.dataset.correct === 'true') o.classList.add('correct');
            else if (o.classList.contains('selected')) o.classList.add('wrong');
        });
        if (selected && selected.dataset.correct === 'true') correct++;
    });

    const modal = document.getElementById('resultModal');
    const emoji = document.getElementById('resultEmoji');
    const text = document.getElementById('resultText');
    const score = document.getElementById('resultScore');

    if (correct === 3) {
        emoji.textContent = '🎉';
        text.textContent = 'शानदार! सब सही!';
    } else if (correct === 2) {
        emoji.textContent = '👍';
        text.textContent = 'बहुत अच्छा!';
    } else if (correct === 1) {
        emoji.textContent = '💪';
        text.textContent = 'कोशिश जारी रखो!';
    } else {
        emoji.textContent = '📚';
        text.textContent = 'फिर से पढ़ो!';
    }
    score.textContent = 'Score: ' + correct + '/3';
    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('resultModal').classList.remove('show');
}

function showOneMinuteAnswer() {
    document.getElementById('answerContent').innerHTML = '<p style="line-height:1.8">' + answers[currentChapter] + '</p>';
    document.getElementById('answerModal').classList.add('show');
}

function closeAnswerModal() {
    document.getElementById('answerModal').classList.remove('show');
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(m => {
        m.addEventListener('click', function (e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    });

    // Highlight keywords on tap
    document.querySelectorAll('.keyword').forEach(k => {
        k.addEventListener('click', function () {
            this.style.transform = 'scale(1.1)';
            this.style.background = '#fdcb6e';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.background = '';
            }, 300);
        });
    });
});
