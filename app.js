var style = null;
var theme = null;
var day = true;
var styles = ["SMB", "SMB3", "SMW", "NSMB", "3DW"];
var themes = ["Ground", "Underground", "Underwater", "Desert", "Snow", "Sky", "Forest", "Ghost House", "Airship", "Castle"];
var common = ["Banzai Bills", "Bloopers", "Bob-ombs", "Boos", "Boom Boom", "Bowser", "Bowser Jr.", "Bullet Bills", "Buzzy Beetles", "Chain Chomps", "Cheep Cheeps", "Dry Bones", "Pirahna Plants", "Fish Bones", "Goombas", "Hammer Bros", "Koopa Troopas", "Lakitu", "Lava Bubbles", "Magikoopas", "Monty Moles", "Moon", "Munchers", "Rocket Wrenches", "Sledge Bros", "Spike Tops", "Spinies", "Stretches", "Thwomps", "Twisters", "Wiggler"];
var exclusives_all = ["the Angry Sun", "Poisonous Mushrooms"];
var exclusives_tdw = ["Ant Troopers", "Bullies", "Cat Banzai Bills", "Cat Bullet Bills", "Charvaargh", "Fire Bros", "Meowser", "Peepas", "Piranha Creepers", "Pom Pom", "Porcupuffer", "Skipsqueak", "Stingbies", "Koopa Cars", "clear pipes", "trees"];
var twists = ["make it vertical", "add a boss battle", "design a puzzle", "use a sub-world", "make it a speedrun", "require spin-jumps", "add custom music", "make it non-linear", "add a clear condition", "don't allow jumping", "have a true ending"];
var cursorArray = ['url("images/cursors/link1.png"), auto', 'url("images/cursors/link2.png"), auto', 'url("images/cursors/link3.png"), auto', 'url("images/cursors/link4.png"), auto'];

i = 0;
(function cursor(){
  $('a').css('cursor', cursorArray[i]);
  i++;
  if(i == cursorArray.length){
    i = 0;
  }
   setTimeout(cursor, 220);
})();


function genStyle() {
  if(!$('#styleLock').prop('checked')) {
    style = styles[Math.floor(Math.random() * styles.length)];
  }
}

function genAll() {

  $('#generated').css('opacity', '0');
  $('.lds-roller').css('display', 'inline-block');

  genStyle();
  /* Theme */
  if (!$('#themeLock').prop('checked')) {
    theme = themes[Math.floor(Math.random() * themes.length)];
  }
  /* Day/Night */
  if (!$('#timeLock').prop('checked')) {
    if (theme != "Ghost House" && Math.floor(Math.random() * 10) < 8) {
      day = true;
    }
    else if (theme == "Ghost House" && Math.floor(Math.random() * 10) < 6) {
      day = true;
    }
    else {
      day = false;
    }
  }
  /* Gimmicks/Enemies */
  if (!$('#enemiesLock').prop('checked')) {
    var arrLen = common.length;
    if (style == "3DW") arrLen += exclusives_tdw.length;
    else arrLen += exclusives_all.length;
    var chosen = 0;
    var used = [null, null, null];
    while (chosen < 3) {
       var nextIndex = Math.floor(Math.random() * arrLen);
       var usedYet = false;
       for (var k = 0; k < used.length; k++) {
         if(used[k] == nextIndex) usedYet = true;
       }
       if (!usedYet) {
         used[chosen] = nextIndex;
         chosen++;
       }
    }

    var htmlInsert = "";

    for (var i = 0; i < used.length; i++) {
      var insertVal = "";
      if (used[i] < common.length) {
        insertVal = common[used[i]];
      }
      else if (style == "3DW") {
        insertVal = exclusives_tdw[used[i] - common.length];
      }
      else {
        insertVal = exclusives_all[used[i] - common.length];
      }
      if(i > 0) htmlInsert += " & ";
      htmlInsert += insertVal;
    }
  }

  if (!$('#twistLock').prop('checked')) {
    var twist = twists[Math.floor(Math.random() * twists.length)];
  }

  var delay = 800 + Math.random() * 1000;

  setTimeout(function(){
    $('#generated').css('opacity', '1');
    $('.lds-roller').css('display', 'none');
    update(htmlInsert, twist);
  }, delay);
}

function update(enemies, twist) {
  if(!$('#styleLock').prop('checked')) $('#style').html('<img src=\"images/styles/' + style + '.png\" class=\"style\" alt=\"' + style + '\" title=\"' + style + '\">');
  if(!$('#themeLock').prop('checked')) $('#theme').html('<img src=\"images/themes/' + theme + '.png\" class=\"theme\" alt=\"' + theme + '\" title=\"' + theme + '\">');
  if (day) {
    $('#time').html("day");
  }
  else $('#time').html("night");
  if (!$('#enemiesLock').prop('checked')) $('#else').html(enemies);
  if (!$('#twistLock').prop('checked')) $('#twist').html(twist);
}
