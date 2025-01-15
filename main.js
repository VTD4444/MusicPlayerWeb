const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'player';

const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist');
const app = {
  currentIndex : 0,
  isPlaying : false,
  isRepeat : false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Một nửa sự thật",
      singer: "24K.Right (ft.Ngắn, Hipz)",
      path: "./mp3/24K.RIGHT - MỘT NỬA SỰ THẬT [feat. NGẮN, HIPZ]  OFFICIAL MUSIC VIDEO.mp3",
      image:
        "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/5/2/6/5/526548535d1e9d2fa5d9a2e9cbc33484.jpg"
    },
    {
      name: "Đi giữa trời rực rỡ",
      singer: "Ngô Lan Hương",
      path:
        "./mp3/Nhạc phim Đi Giữa Trời Rực Rỡ - Ngô Lan Hương (MV Lyrics).mp3",
      image: "https://i.scdn.co/image/ab67616d0000b273ece8ffa522257b06703bf51f"
    },
    {
      name: "Dự báo thời thiết hôm nay mưa",
      singer: "GREY D",
      path: "./mp3/GREY D - dự báo thời tiết hôm nay mưa  official visualizer.mp3",
      image:
        "https://i.ytimg.com/vi/heMYSOZoT3c/maxresdefault.jpg"
    },
    {
      name: "Mất kết nối",
      singer: "Dương Domic",
      path: "./mp3/Dương Domic - Mất Kết Nối  EP 'Dữ Liệu Quý'.mp3",
      image:
        "https://i.ytimg.com/vi/lRsaDQtYqAo/maxresdefault.jpg"
    },
    {
      name: "Vài câu nói có khiến người thay đổi",
      singer: "GREY D x tlinh",
      path: "./mp3/GREY D x tlinh - vaicaunoicokhiennguoithaydoi  Official Music Video.mp3",
      image: "https://i.ytimg.com/vi/2iidlwQ-NfU/maxresdefault.jpg"
    },
    {
      name: "Exit Sign",
      singer: "HIEUTHUHAI",
      path: "./mp3/HIEUTHUHAI - Exit Sign (prod. by Kewtiie) ft. marzuz [Official Lyric Video].mp3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7frpb0dS9vzNG7uZr5MIj_bZQRdFvq4oefA&s"
    },
    {
      name: "Bạn đời",
      singer: "KARIK (ft. GDUCKY)",
      path:
        "./mp3/KARIK - BẠN ĐỜI (FT. GDUCKY)  Official Visualizer.mp3",
      image: "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/5/4/8/e/548ebf004852b5e6887fb3f8861115c1.jpg"
    },
    {
      name: "Kim phút kim giờ",
      singer: "HURRYKNG x HIEUTHUHAI x ISAAC x Pháp Kiều x Negav",
      path: "./mp3/Kim Phút Kim Giờ - ATSH (Lyrics).mp3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoAw14x0JOF-yLq8Dniyeohau1GMo_4zkmHw&s"
    },
    {
      name: "Lệ lưu ly",
      singer: "Vũ Phụng Tiên x DT Tập Rap x DRUM7",
      path: "./mp3/LỆ LƯU LY - VŨ PHỤNG TIÊN X DT TẬP RAP X DRUM7  OFFICIAL MUSIC VIDEO.mp3",
      image:
        "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/6/9/3/f/693f8f516bfaa717ef4043f11edfdde2.jpg"
    },
    {
      name: "Hào quang",
      singer: "RHYDER x Dương Domic x Pháp Kiều",
      path: "./mp3/RHYDER, Dương Domic, Pháp Kiều - HÀO QUANG I OFFICIAL LYRICS VIDEO.mp3",
      image: "https://i1.sndcdn.com/artworks-9HteeDVkyRkMlq6R-L38bPA-t500x500.jpg"
    },
    {
      name: "id 072019 3107",
      singer: "Wn (ft. 267)",
      path: "./mp3/Wn - id 072019  3107 ft 267.mp3",
      image:
        "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/6/e/d/b/6edb77335e90a767735022f61ae93ab4.jpg"
    },
    {
      name: "Đừng làm trái tim anh đau",
      singer: "Sơn Tùng M-TP",
      path: "./mp3/ĐỪNG LÀM TRÁI TIM ANH ĐAU SƠN TÙNG M-TP  LYRICS.mp3",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTGIXcF_j4hG-B9cEIQB3Bc67CDdRlVn8dmg&s"
    }
  ],
  setConfig: function(key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function() {
    const htmls = this.songs.map((song, index) => {
        return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}">
                <div class="thumb" style="background-image: url('${song.image}' )">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
        `
    });
    playlist.innerHTML = htmls.join('');
  },
  defineProperties: function() {
    Object.defineProperty(this, 'currentSong',{
      get: function() {
        return this.songs[this.currentIndex];
      }
    })
  },
  handleEvents: function() {
    const _this = this;
    const cdWidth = cd.offsetWidth;
    let isSeeking = false;
    const cdThumbAnimate = cdThumb.animate([
      {transform: 'rotate(360deg)'}
    ], {
      duration: 10000,
      iterations: Infinity,
    });
    cdThumbAnimate.pause();

    //Xử lý phóng to, thu nhỏ CD
    document.onscroll = function() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const newCdWidth = cdWidth - scrollTop;

        cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' :  0;
        cd.style.opacity = newCdWidth / cdWidth;
    }

    //Xử lý nút play khi click
    playBtn.onclick = function() {
      if (!_this.isPlaying) {
        audio.play();
      }
      else {
        audio.pause();
      }
    }
    audio.onplay = function() {
      _this.isPlaying = true;
      player.classList.add('playing');
      cdThumbAnimate.play();
    }
    audio.onpause = function() {
      _this.isPlaying = false;
      player.classList.remove('playing');
      cdThumbAnimate.pause();
    }

    // Xử lý khi tua
    audio.ontimeupdate = function() {
      if (audio.duration && !isSeeking) { // Chỉ cập nhật khi không đang tua
        const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100);
        progress.value = progressPercent;
      }
    }
    progress.onmousedown = function() {
      isSeeking = true; // Bắt đầu giữ để tua
    }
    progress.onmouseup = function() {
      isSeeking = false; // Kết thúc giữ để tua
      const seekTime = audio.duration / 100 * progress.value;
      audio.currentTime = seekTime;
    }

    //Xử lý khi click button
    nextBtn.onclick = () => _this.nextSong();
    prevBtn.onclick = () => _this.prevSong();
    randomBtn.onclick = () => _this.shuffleSongs();
    repeatBtn.onclick = () => _this.repeatSong();

    //Xu ly khi het bai
    audio.onended = () => _this.nextSong();

    //Xu ly chon bai
    playlist.onclick = function(e) {
      if (e.target.tagName === 'I') return;
      const songIndex = Array.from(playlist.children).indexOf(e.target.closest('.song'));
      _this.currentIndex = songIndex;
      _this.loadCurrentSong();
      _this.render();
      _this.scrollToActiveSong();
      audio.play();
    }
  },
  loadCurrentSong: function() {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  nextSong: function() {
    if (this.isRandom) 
      this.playRandomSong();
    else {
      this.currentIndex++;
      if (this.currentIndex >= this.songs.length) {
        this.currentIndex = 0;
      }
    }
    this.loadCurrentSong();
    this.render();
    this.scrollToActiveSong();
    audio.play();
  },
  prevSong: function() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
    this.render();
    this.scrollToActiveSong();
    audio.play();
  },
  shuffleSongs: function() {
    const currentSong = this.currentSong;
    for (let i = this.songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.songs[i], this.songs[j]] = [this.songs[j], this.songs[i]];
    }
    this.currentIndex = this.songs.indexOf(currentSong);
    this.render();
  },
  repeatSong: function() {
    this.isRepeat =!this.isRepeat;
    this.setConfig('isRepeat', this.isRepeat);
    repeatBtn.classList.toggle('active', this.isRepeat);
    audio.loop = this.isRepeat;
    this.scrollToActiveSong();
  },
  scrollToActiveSong: function() {
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        behavior:'smooth',
        block: 'center',
      });
    }, 300);
  },
  loadConfig: function() {
    this.isRepeat = this.config.isRepeat;
    repeatBtn.classList.toggle('active', this.isRepeat);
  },
  start: function() {
    this.loadConfig();
    this.defineProperties();
    this.handleEvents();
    this.loadCurrentSong();
    this.render();
  }
}

app.start();