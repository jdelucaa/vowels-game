/**
 * Created by joana on 04/06/2017.
 */

load_letters("NOOB");

function load_letters(word) {
    var img_out = "";
    var letters = $("#images");

    var wordLength = word.length;

    for (var i = 0; i < wordLength; i++) {
        var letter = word[i];

        if (letter === "A" || letter === "E" || letter === "I" || letter === "O" || letter === "U") {
            img_out += "<img src='./res/" + letter + ".png' class='letra " + letter + " correct'/>";
        } else {
            img_out += "<img src='./res/" + letter + ".png' class='letra " + letter + " incorrect'/>";
        }
    }
    $(letters).append(img_out);

    $('.letra ').each(function () {
        handleTouch(this);
    });
}

function handleTouch(letter) {
    var mc = new Hammer.Manager(letter, {});

    mc.add(new Hammer.Pan({direction: Hammer.DIRECTION_ALL, threshold: 0}));

    mc.on("pan", function (event) {
        var elem = event.target;

        $(elem).css({'transform': 'translate(' + event.deltaX + 'px,' + event.deltaY + 'px)'});

        if (event.isFinal) {
            $(event.target).css({'transform': 'translate(0,0)'});
            var dropEl = document.elementFromPoint(event.pointers[0].pageX, event.pointers[0].pageY);

            console.log('dropped on', dropEl);

            var elemClass = elem.getAttribute("class").split(" ");
            var elemChecker = elemClass[2];

            var dropElemId = dropEl.getAttribute('id');

            if (dropElemId === "targetDiv") {
                if (elemChecker === "correct") {
                    // processar acerto
                    elem.setAttribute("class", "invisible");
                    dropEl.style.background = "green";
                } else {
                    dropEl.style.background = "red";
                }
            }
        }
    });
}
