/**
 * Created by jessedavila on 11/1/16.
 */
"use strict";

var tiles = $('.tile');

var game = {
    userSeq: [],
    simonSeq: [],
    level: 1,
    score: 0,
    start: false
};

$("#start").click(function() {
    game.start = true;
    randomPad();
});

tiles.click(function() {
    if (game.start) {
        var tile = $(this);
        var value = parseInt(this.value);
        game.userSeq.push(value);
        compare();
    } else {
        alert('press start');
    }

});

tiles.hover(
    function() {
        $(this).addClass('lit');
    },
    function() {
        $(this).removeClass('lit');
    }
);

function randomPad() {
    var random = Math.floor(Math.random() * 4) + 1;
    game.simonSeq.push(random);
    setInterval(lightUp(game.simonSeq),1000);
    console.log(game.simonSeq);
}

function compare() {
    if (game.userSeq.length == game.simonSeq.length) {
        if (game.userSeq[game.userSeq.length-1] == game.simonSeq[game.simonSeq.length-1]) {
            newLevel();
            console.log('equal');
        } else if (game.userSeq[game.userSeq.length-1] !== game.simonSeq[game.simonSeq.length-1]) {
            youLost();
        }
    } else if (game.userSeq[game.userSeq.length-1] !== game.simonSeq[game.userSeq.length-1]) {
        youLost();
    }
}

function newLevel() {
    ++game.level;
    randomPad();
    game.userSeq = [];
}

function youLost() {
    alert('you lost');
    game.start = false;
    game.userSeq = [];
    game.simonSeq = [];
}

function lightUp(data) {
    data.forEach(function (element,index) {
        // $("[value="+element+"]").addClass("lit");
        setTimeout(function(){
            $("[value="+element+"]").addClass("lit");
        },1000)
    })

}
function lightDown(data) {
    $("[value="+data+"]").removeClass("lit");
}

