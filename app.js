(function () {
  "use strict";

  var EVENTS = {
    wedding: {
      title: "Wedding Ceremony",
      calendarTitle: "Swarna and Pradeep Wedding",
      date: "2026-06-29T12:15:00+05:30",
      duration: 4,
      venue: "BAZAR Auditorium",
      address: "Kandur Panemangalore",
      lat: 12.859094718842679,
      lng: 75.03159590167243
    }
  };

  var PREFERS_REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var envelopeScreen = document.getElementById("envelopeScreen");
  var envelope = document.getElementById("envelope");
  var goldenBurst = document.getElementById("goldenBurst");
  var introTransition = document.getElementById("introTransition");
  var navDim = document.getElementById("navDim");
  var mainContent = document.getElementById("mainContent");
  var weddingSection = document.getElementById("weddingSection");
  var weddingVideo = document.getElementById("weddingVideo");
  var backgroundMusic = document.getElementById("bgMusic");
  var soundToggle = document.getElementById("soundToggle");
  var soundToggleLabel = soundToggle.querySelector(".sound-btn__label");
  var scrollHint = document.getElementById("scrollHint");

  var state = {
    envelopeOpened: false,
    musicOn: true,
    heroInView: true,
    navigatingAway: false
  };

  function openInvitation() {
    if (state.envelopeOpened) return;

    state.envelopeOpened = true;
    envelope.classList.add("opening");
    envelopeScreen.classList.add("hidden");
    mainContent.classList.add("visible");
    soundToggle.classList.add("visible");
  }

  envelope.addEventListener("click", openInvitation);

  function initScratchCard() {
    var wrapper = document.getElementById("scratchWrapper");
    var canvas = document.getElementById("scratchCanvas");

    if (!wrapper || !canvas) return;

    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var logicalW = 0;
    var logicalH = 0;

    function drawGoldCover() {
      ctx.clearRect(0, 0, logicalW, logicalH);

      // GOLD BASE
      var grad = ctx.createLinearGradient(0, 0, logicalW, logicalH);
      grad.addColorStop(0, "#d4a855");
      grad.addColorStop(0.25, "#f0cc7a");
      grad.addColorStop(0.5, "#c89a56");
      grad.addColorStop(0.75, "#e8c070");
      grad.addColorStop(1, "#b8893d");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, logicalW, logicalH);

      // TEXTURE
      ctx.save();
      ctx.strokeStyle = "rgba(255, 240, 180, 0.1)";
      ctx.lineWidth = 0.8;
      for (var i = -logicalH; i < logicalW + logicalH; i += 10) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + logicalH, logicalH);
        ctx.stroke();
      }
      ctx.restore();

      // GLEAM
      var gleam = ctx.createLinearGradient(0, 0, logicalW * 0.7, logicalH * 0.5);
      gleam.addColorStop(0, "rgba(255,252,220,0)");
      gleam.addColorStop(0.35, "rgba(255,252,220,0.22)");
      gleam.addColorStop(1, "rgba(255,252,220,0)");
      ctx.fillStyle = gleam;
      ctx.fillRect(0, 0, logicalW, logicalH);

      // =========================
      // ENGRAVED TEXT (SAFE ADD)
      // =========================
      ctx.save();

      ctx.textAlign = "center";
      ctx.globalAlpha = 0.9;

      // shadow (engrave depth)
      ctx.shadowColor = "rgba(0,0,0,0.35)";
      ctx.shadowBlur = 2;
      ctx.shadowOffsetY = 1;

      ctx.fillStyle = "#6b1f1f";
      ctx.font = "600 20px Cinzel, serif";
      ctx.fillText("29 June 2026", logicalW / 2, logicalH / 2 - 10);

      ctx.font = "500 16px Cinzel, serif";
      ctx.fillText("12:15 PM", logicalW / 2, logicalH / 2 + 20);

      // highlight (top shine)
      ctx.shadowColor = "rgba(255,255,255,0.25)";
      ctx.shadowBlur = 1;
      ctx.shadowOffsetY = -1;

      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fillText("29 June 2026", logicalW / 2, logicalH / 2 - 10);
      ctx.fillText("12:15 PM", logicalW / 2, logicalH / 2 + 20);

      ctx.restore();
    }

    function initCanvas() {
      logicalW = wrapper.offsetWidth;
      logicalH = wrapper.offsetHeight;

      if (!logicalW || !logicalH) {
        setTimeout(initCanvas, 80);
        return;
      }

      canvas.width = logicalW * dpr;
      canvas.height = logicalH * dpr;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      drawGoldCover();
    }

    setTimeout(initCanvas, 0);
  }

  initScratchCard();
})();
