// =============================================
// Hardcoded data (file:// CORS 방지)
// =============================================
const HISTORY_DATA = [
    { date: "2024.08", event: "ISO 9001 인증" },
    { date: "2017.12", event: "강원도지사 표창" },
    { date: "2013.02", event: "비에이텍(주) 상호변경" },
    { date: "2010.11.01", event: "(주)강원유체 설립" }
];

document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // 모바일 햄버거 메뉴
    // =============================================
    const hamburger = document.querySelector('.hamburger');
    const gnb = document.querySelector('.gnb');

    if (hamburger && gnb) {
        hamburger.addEventListener('click', () => {
            gnb.classList.toggle('active');
            const spans = hamburger.querySelectorAll('span');
            if (gnb.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        document.querySelectorAll('.gnb a').forEach(link => {
            link.addEventListener('click', () => {
                gnb.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // =============================================
    // 연혁 타임라인 렌더링
    // =============================================
    const historyContainer = document.getElementById('history-container');
    if (historyContainer) {
        HISTORY_DATA.forEach((item, index) => {
            const position = index % 2 === 0 ? 'left' : 'right';
            const timelineItem = document.createElement('div');
            timelineItem.className = `timeline-item ${position}`;
            timelineItem.innerHTML = `
                <div class="timeline-content">
                    <span class="timeline-date">${item.date}</span>
                    <h4 class="timeline-event">${item.event}</h4>
                </div>
            `;
            historyContainer.appendChild(timelineItem);
        });
    }

    // =============================================
    // 탭 UI (intro.html, equipment.html)
    // =============================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabBtns.length > 0 && tabPanes.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                const targetId = btn.getAttribute('data-target');
                const targetPane = document.querySelector(targetId);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }

    // =============================================
    // URL 해시 기반 탭 자동 활성화
    // =============================================
    const activateTabFromHash = () => {
        if (!window.location.hash) return;
        let hash = window.location.hash;

        // GNB 링크 해시와 탭 ID 매핑
        const hashMap = {
            '#overview':      '#tab-overview',
            '#organization':  '#tab-organization',
            '#performance':   '#tab-performance',
            '#certification': '#tab-certification',
            '#factory':       '#tab-factory',
            '#equipment':     '#tab-equipment',
        };

        const mappedHash = hashMap[hash] || hash;
        const targetBtn = Array.from(tabBtns).find(
            btn => btn.getAttribute('data-target') === mappedHash
        );

        if (targetBtn) {
            targetBtn.click();
            setTimeout(() => {
                const container = document.querySelector('.tab-container');
                if (container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    activateTabFromHash();
    window.addEventListener('hashchange', activateTabFromHash);

    // =============================================
    // ESG 캠페인 슬라이더 및 모달 기능
    // =============================================
    const sliderWrapper = document.querySelector('.esg-slider-wrapper');
    const slides = document.querySelectorAll('.esg-slide');
    const prevBtn = document.querySelector('.esg-slider-btn.prev-btn');
    const nextBtn = document.querySelector('.esg-slider-btn.next-btn');
    const dots = document.querySelectorAll('.esg-dot');

    if (sliderWrapper && slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;

        const updateSlider = (index) => {
            currentSlide = (index + totalSlides) % totalSlides;
            sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            dots.forEach((dot, idx) => {
                if (idx === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                updateSlider(currentSlide - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                updateSlider(currentSlide + 1);
            });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'), 10);
                updateSlider(index);
            });
        });

        // ESG 모달 열기/닫기
        const esgModal = document.getElementById('esg-modal');
        const modalImg = document.getElementById('esg-modal-img');
        const closeBtn = document.querySelector('.esg-modal-close');
        const posterWrappers = document.querySelectorAll('.esg-poster-wrapper');

        posterWrappers.forEach(wrapper => {
            wrapper.addEventListener('click', () => {
                const img = wrapper.querySelector('.esg-poster');
                if (esgModal && modalImg && img) {
                    esgModal.style.display = 'flex';
                    modalImg.src = img.src;
                }
            });
        });

        if (closeBtn && esgModal) {
            closeBtn.addEventListener('click', () => {
                esgModal.style.display = 'none';
            });

            esgModal.addEventListener('click', (e) => {
                if (e.target === esgModal) {
                    esgModal.style.display = 'none';
                }
            });
        }
    }

    // =============================================
    // 3D 입체 브로슈어 모달 제어
    // =============================================
    const openBrochureBtn = document.getElementById('open-brochure-btn');
    const brochureModal = document.getElementById('brochure-modal');
    const brochureCloseBtn = document.querySelector('.brochure-close');

    if (openBrochureBtn && brochureModal) {
        // 모달 열기
        openBrochureBtn.addEventListener('click', () => {
            brochureModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // 뒷배경 스크롤 방지
        });

        // 모달 닫기 함수
        const closeBrochure = () => {
            brochureModal.classList.remove('active');
            document.body.style.overflow = ''; // 스크롤 복구
        };

        // [X] 닫기 버튼 클릭 시 닫기
        if (brochureCloseBtn) {
            brochureCloseBtn.addEventListener('click', closeBrochure);
        }

        // 모달 어두운 배경(오버레이) 영역 클릭 시 닫기
        brochureModal.addEventListener('click', (e) => {
            if (e.target === brochureModal) {
                closeBrochure();
            }
        });

        // ESC 키 입력 시 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && brochureModal.classList.contains('active')) {
                closeBrochure();
            }
        });
    }

    // =============================================
    // 기업 접근성 시뮬레이터 (Interactive Route Guide - Google Maps 연동)
    // =============================================
    const ROUTE_DATA = {
        location: {
            icon:     'fa-building',
            start:    '비에이텍(주) 본사',
            distance: '본사 위치',
            taxi:     '무료 주차',
            guide:    '강원특별자치도 춘천시 퇴계공단2길 64 (퇴계제2농공단지내)에 위치하고 있습니다.',
            badge:    true,
            naverUrl: 'https://map.naver.com/v5/entry/place/19794503?c=15,0,0,0,dh',
            kakaoUrl: 'https://map.kakao.com/link/map/비에이텍,37.84889,127.72906',
            embedUrl: 'https://maps.google.com/maps?q=37.84889,127.72906&t=&z=16&ie=UTF8&iwloc=&output=embed'
        },
        namchuncheon: {
            icon:     'fa-train',
            start:    '남춘천역',
            distance: '3.8 km',
            taxi:     '약 10분',
            guide:    '남춘천역 2번 출구 이용 / 퇴계공단 방면 시내버스 탑승 (환승 불필요)',
            badge:    true,
            naverUrl: 'https://map.naver.com/v5/directions/남춘천역/강원특별자치도%20춘천시%20퇴계공단2길%2064/-/-/transit',
            kakaoUrl: 'https://map.kakao.com/link/from/남춘천역,37.8662,127.7217/to/비에이텍,37.8489,127.7290',
            embedUrl: 'https://maps.google.com/maps?saddr=37.8638,127.7238&daddr=37.84889,127.72906&t=&z=14&ie=UTF8&iwloc=&output=embed'
        },
        terminal: {
            icon:     'fa-bus',
            start:    '춘천시외버스터미널',
            distance: '4.2 km',
            taxi:     '약 12분',
            guide:    '터미널 건너편 정류장 이용 / 남춘천역 방면 이동 후 퇴계공단 진입',
            badge:    false,
            naverUrl: 'https://map.naver.com/v5/directions/춘천시외버스터미널/강원특별자치도%20춘천시%20퇴계공단2길%2064/-/-/transit',
            kakaoUrl: 'https://map.kakao.com/link/from/춘천시외버스터미널,37.8728,127.7264/to/비에이텍,37.8489,127.7290',
            embedUrl: 'https://maps.google.com/maps?saddr=37.8631,127.7188&daddr=37.84889,127.72906&t=&z=14&ie=UTF8&iwloc=&output=embed'
        },
        chuncheon: {
            icon:     'fa-train-subway',
            start:    '춘천역',
            distance: '6.5 km',
            taxi:     '약 15분',
            guide:    '춘천역 환승센터 이용 / 호반순환도로 및 공단 외곽도로 이용 권장',
            badge:    false,
            naverUrl: 'https://map.naver.com/v5/directions/춘천역/강원특별자치도%20춘천시%20퇴계공단2길%2064/-/-/transit',
            kakaoUrl: 'https://map.kakao.com/link/from/춘천역,37.8814,127.7298/to/비에이텍,37.8489,127.7290',
            embedUrl: 'https://maps.google.com/maps?saddr=37.8847,127.7170&daddr=37.84889,127.72906&t=&z=13&ie=UTF8&iwloc=&output=embed'
        }
    };

    const routeTabBtns  = document.querySelectorAll('.route-tab-btn');
    const mapIframe     = document.getElementById('route-map-iframe');
    const mapLoading    = document.getElementById('map-loading');

    // 동적으로 교체되는 텍스트 요소
    const elIcon        = document.getElementById('route-icon');
    const elStartName   = document.getElementById('route-start-name');
    const elDistance    = document.getElementById('route-distance');
    const elTaxi        = document.getElementById('route-taxi');
    const elGuideText   = document.getElementById('route-guide-text');
    const elBadge       = document.querySelector('.route-card-badge');
    const elNaverLink   = document.getElementById('naver-route-link');
    const elKakaoLink   = document.getElementById('kakao-route-link');
    const elCardIcon    = document.querySelector('.route-card-icon i');

    // 애니메이션을 위한 fade 트리거 헬퍼
    const triggerFade = (el) => {
        if (!el) return;
        el.classList.remove('route-fade');
        // reflow 강제 발생으로 animation 재시작
        void el.offsetWidth;
        el.classList.add('route-fade');
    };

    // 지도 iframe src 교체 + 로딩 스피너 처리
    const updateMap = (embedUrl) => {
        if (!mapIframe) return;
        if (mapLoading) {
            mapLoading.style.display = 'flex';
        }
        mapIframe.src = embedUrl;
        mapIframe.onload = () => {
            if (mapLoading) {
                mapLoading.style.display = 'none';
            }
        };
    };

    // 탭 전환 핸들러
    const switchRoute = (key) => {
        const data = ROUTE_DATA[key];
        if (!data) return;

        // 탭 active 클래스 토글
        routeTabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.route === key);
        });

        // 카드 헤더 아이콘 교체
        if (elCardIcon) {
            elCardIcon.className = `fas ${data.icon}`;
        }
        if (elIcon) {
            elIcon.className = `fas ${data.icon}`;
        }

        // 텍스트 요소 교체 + fade 애니메이션 + 본사 탭 텍스트 축소 클래스 처리
        if (elStartName) { elStartName.textContent = data.start; triggerFade(elStartName); }
        
        if (elDistance) {
            elDistance.textContent = data.distance;
            if (key === 'location') {
                elDistance.classList.add('small-text');
            } else {
                elDistance.classList.remove('small-text');
            }
            triggerFade(elDistance);
        }
        
        if (elTaxi) {
            elTaxi.textContent = data.taxi;
            if (key === 'location') {
                elTaxi.classList.add('small-text');
            } else {
                elTaxi.classList.remove('small-text');
            }
            triggerFade(elTaxi);
        }
        
        if (elGuideText) { elGuideText.textContent = data.guide; triggerFade(elGuideText); }

        // 추천 배지 표시/숨김
        if (elBadge) {
            elBadge.style.display = data.badge ? 'flex' : 'none';
        }

        // 외부 길찾기 링크 업데이트
        if (elNaverLink) elNaverLink.href = data.naverUrl;
        if (elKakaoLink) elKakaoLink.href = data.kakaoUrl;

        // 지도 교체 (구글 지도 iframe src 동적 반영)
        updateMap(data.embedUrl);
    };

    // 첫 번째 탭 활성화 (초기 상태 설정)
    switchRoute('location');

    // 탭 클릭 이벤트 바인딩
    routeTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchRoute(btn.dataset.route);
        });
    });

    // 페이지 최초 로드 시 지도 로딩 처리
    if (mapIframe && mapLoading) {
        mapIframe.addEventListener('load', () => {
            mapLoading.classList.add('hidden');
        }, { once: true });
    }

});
