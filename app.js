const calc_screen = document.querySelector('#calc_screen');
const calc_btns = document.querySelector('#calc_buttons');

function calc(prev, curr, action) {
    const actions_dict = {
        '+': () => prev + curr,
        '-': () => prev - curr,
        'x': () => prev * curr,
        '/': () => {
            return curr == 0 ? 'Ошибка' : prev / curr;
        },
    };

   return actions_dict[action]();
}

let prev = '', curr = '', action = '', calc_finished = false;

const length_limit = 20;    // I set a max num length so as not to cause overflow

calc_btns.addEventListener('click', e => {
    const type = e.target.dataset.type;
    const btn_content = e.target.textContent;

    const exceeds_limit = curr.length > length_limit ? true : false;

    switch (type) {
        case 'num':
            if ( (btn_content == '.' && curr.includes('.')) || (btn_content == '0' && calc_screen.textContent == '0') || exceeds_limit ) return;
            if (btn_content == '.' && calc_screen.textContent == '0') {
                curr = '0' + btn_content;
            } else {
                curr += btn_content;
            }
            calc_screen.textContent = curr;
            break;
        
        case 'action': 
            if (!calc_finished) {
                prev = curr;
            }
            curr = '';
            action = btn_content;
            break;
        
        case 'equals':
            if (curr == '') curr = prev;
            prev = calc(+prev, +curr, action);
            calc_screen.textContent = prev;
            calc_finished = true;
            break;
        
        case 'reset':
            prev = '';
            curr = '';
            action = '';
            calc_finished = false;
            calc_screen.textContent = '0';
            break;
        
        case 'del':
            if (calc_finished || calc_screen.textContent == '0') return;
            curr = curr.slice(0, - 1);
            calc_screen.textContent = curr;
            break;
        
        default:
            console.log('btn not found');
            break;
    }
})