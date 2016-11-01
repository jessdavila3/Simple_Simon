/**
 * Created by jessedavila on 11/1/16.
 */
"use strict";

var tiles = $('.tile');

var game = {
    userSeq: [],
    simonSeq: [],
    level: 0,
    start: false
};

$("#start").click(function () {
    if (game.start) {
        alert('game has already started');
    } else {
        game.start = true;
        newLevel();
    }
});

function newLevel() {
    var sequence = game.simonSeq //might cause issues with randompad called later
    ++game.level;
    randomPad();
    game.userSeq = [];
    lightUp(sequence);
    $("#level").html("Level: " + game.level);
}

function randomPad() {
    var random = Math.floor(Math.random() * 4) + 1;
    game.simonSeq.push(random);
    console.log(game.simonSeq);
}

/*function lightUp(data) {
    var light = $.each(data, function (index, element) {
        setTimeout(function () {
            $("[value=" + element + "]").addClass("lit")
        }, 1000);
        setTimeout(function () {
            $("[value=" + element + "]").removeClass("lit")
        }, 2000)
        console.log("index:"+index+"    element:"+element);
    })
}*/

function light(tile) {
    var $tile = $('[value='+tile+']').addClass('lit');
    window.setTimeout(function() {
        $tile.removeClass('lit');
    }, 300);
}
function lightUp(data) {
    var i = 0;
    var interval = setInterval(function() {
        light(data[i]);
        i++;
        if (i >= data.length) {
            clearInterval(interval);
        }

    },600);
}

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

function compare() {
    if (game.userSeq.length == game.simonSeq.length) {
        if (game.userSeq[game.userSeq.length - 1] == game.simonSeq[game.simonSeq.length - 1]) {
            newLevel();
        } else if (game.userSeq[game.userSeq.length - 1] !== game.simonSeq[game.simonSeq.length - 1]) {
            youLost();
        }
    } else if (game.userSeq[game.userSeq.length - 1] !== game.simonSeq[game.userSeq.length - 1]) {
        youLost();
    }
}

function youLost() {
    alert('you lost');
    game.start = false;
    game.userSeq = [];
    game.simonSeq = [];
    game.level = 0;
}

tiles.hover(
    function () {
        $(this).addClass('lit');
    },
    function () {
        $(this).removeClass('lit');
    }
);




