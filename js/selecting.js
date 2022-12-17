var x, i, j, l, ll, selElmnt, a, b, c;

/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");

    // 셀렉트 박스 포지션 변경 ( .reverse 클래스가 선언된 셀렉트 박스 )
    const customSelect = $(selElmnt).parent();
    const isReverse = customSelect.hasClass('reverse');
    if (isReverse) {
        $(b).css('top', ((ll - 1) * -100) + '%');
    }

    for (j = 1; j < ll; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        // 기존 옵션의 value 값을 저장 
        c.setAttribute('data-value', selElmnt.options[j].value);
        c.addEventListener("click", function (e) {
            /*when an item is clicked, update the original select box,
            and the selected item:*/
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");

                    // 선택한 옵션 값에 맞게 색상 및 border 변경 
                    changeStyle($(h).parent(), $(this).data('value'));
                    break;
                }
            }
            h.click();
        });
        // 셀렉트 박스가 위로 열릴 때, 옵션 순서를 뒤집음
        if (isReverse) {
            $(b).prepend(c);
        } else {
            $(b).append(c);
        }
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

function changeBorder(getValue) {
    let bd = document.querySelector('.select-selected');
    let selectValue = getValue.value;
    bd.style.borderRadius = selectValue + "px";
}

function changeStyle(el, value) {
    let color;
    let radius;
    let shadow;
    let bgcolor;
    if (value == '1') {
        color = 'black';
        bgcolor = 'white';
        radius = '5px';
        shadow = 'inset 0.1em 0.5em 0.8em black';
    } else if (value == '2') {
        color = 'white';
        bgcolor = 'black';
        radius = '30px';
        shadow = 'inset 0.3em 0.5em 0.8em white';
    } else if (value == '3') {
        color = 'white';
        bgcolor = 'grey';
        radius = '60px';
        shadow = 'inset 0.5em 0.1em 0.8em black';
    }

    el.css({
        'background-color': bgcolor,
        'color': color,
        'border-radius': radius,
        'box-shadow': shadow
    });

    // Animation ( https://animate.style/ )
    const animateClass = 'animate__animated animate__swing';

    el.removeClass(animateClass).addClass(animateClass);

    el[0].addEventListener('animationend', function () {
        el.removeClass(animateClass);
    });
}


