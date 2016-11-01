/**
 * Created by jessedavila on 11/1/16.
 */
"use strict";

var tiles = $('.tile');

var game = {
    userSeq: [],
    simonSeq: [],
    level: 0,
    score: 0,
    start: false
};

$("#start").click(function () {
    game.start = true;
    newLevel();
});

tiles.click(function () {
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
    function () {
        $(this).addClass('lit');
    },
    function () {
        $(this).removeClass('lit');
    }
);

function randomPad() {
    var random = Math.floor(Math.random() * 4) + 1;
    game.simonSeq.push(random);
    console.log(game.simonSeq);
}

function compare() {
    if (game.userSeq.length == game.simonSeq.length) {
        if (game.userSeq[game.userSeq.length - 1] == game.simonSeq[game.simonSeq.length - 1]) {
            newLevel();
            console.log('equal');
        } else if (game.userSeq[game.userSeq.length - 1] !== game.simonSeq[game.simonSeq.length - 1]) {
            youLost();
        }
    } else if (game.userSeq[game.userSeq.length - 1] !== game.simonSeq[game.userSeq.length - 1]) {
        youLost();
    }
}

function newLevel() {
    ++game.level;
    randomPad();
    game.userSeq = [];
    lightUp(game.simonSeq);
}

function youLost() {
    alert('you lost');
    game.start = false;
    game.userSeq = [];
    game.simonSeq = [];
}

function lightUp(data) {
    var light = data.forEach(function (element, index) {
        setTimeout(function () {
            $("[value=" + element + "]").addClass("lit")
        }, 2000);
        setTimeout(function () {
            $("[value=" + element + "]").removeClass("lit")
        }, 4000)
    })
    clearTimeout(light);
}
var level = game.level;
$("#level").html("Level: " + level);


