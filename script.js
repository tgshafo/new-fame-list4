// ДАННЫЕ УЧАСТНИКА - ТОЛЬКО ВЛАДЕЛЕЦ
const members = [
    {
        id: 1,
        nickname: "шафо",
        username: "@nothevo",
        category: "Владелец",
        role: "Владелец",
        description: "Владелец этого фейм листа. Вход 50 зв, галочка 30зв, закреп 50зв.",
        avatar: "https://via.placeholder.com/120/2a2a2a/fff?text=S",
        verified: true,
        pinned: true,
        project: "https://t.me/+UO-WJgp_j65iYjA6",
        telegram: "nothevo",
        chat: "https://t.me/+I8WOJDuVRIdjNGUy",
        joinDate: "2024-01-01",
        activity: "Постоянная",
        posts: 1000,
        followers: 15000,
        priceEntry: "50 зв",
        priceVerified: "30 зв",
        pricePinned: "50 зв",
        details: "Создатель и владелец Fame TG. Занимаюсь развитием сообщества и модерацией. Отвечаю на вопросы по поводу добавления в список и других услуг.",
        skills: ["Администрирование", "Модерация", "Развитие сообщества"],
        socials: {
            telegram: "@nothevo",
            project: "t.me/+UO-WJgp_j65iYjA6",
            chat: "t.me/+I8WOJDuVRIdjNGUy"
        }
    }
];

// Текущие настройки
let currentTheme = 'dark';
let currentNeonColor = '#808080';
let currentNeonIntensity = 0.5;
let currentNeonSpeed = 5;
let currentAnimatedBg = 'hooks';
let currentBgSpeed = 10;
let currentBgOpacity = 0.5;

// Массив всех фонов для удобства
const allBackgrounds = [
    'particles', 'waves', 'pulse', 'hooks', 'circuit',
    'grid', 'dots', 'lines', 'hexagon', 'triangles',
    'bubbles', 'stars', 'rain', 'glitch', 'matrix',
    'spiral', 'nebula', 'cyberpunk', 'fractal', 'circuit2',
    'laser', 'scanlines', 'vortex'
];

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initMembers();
    initSnow();
    initSettings();
    initNeonControls();
    initAnimatedBg();
    initModals();
    loadSavedSettings();
    initDynamicNeon();
    
    // Генерируем сетку фонов в модальном окне
    generateBgGrid();
});

// Генерация сетки фонов
function generateBgGrid() {
    const grid = document.querySelector('.animated-bg-grid');
    if (!grid) return;
    
    // Очищаем и добавляем все фоны
    grid.innerHTML = '';
    
    allBackgrounds.forEach(bg => {
        const option = document.createElement('div');
        option.className = `animated-bg-option ${bg === currentAnimatedBg ? 'active' : ''}`;
        option.dataset.bg = bg;
        
        option.innerHTML = `
            <div class="bg-preview ${bg}-bg"></div>
            <span>${getBgName(bg)}</span>
        `;
        
        option.addEventListener('click', function() {
            document.querySelectorAll('.animated-bg-option').forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
            currentAnimatedBg = this.dataset.bg;
        });
        
        grid.appendChild(option);
    });
}

// Получение читаемого имени фона
function getBgName(bg) {
    const names = {
        'particles': 'Частицы',
        'waves': 'Волны',
        'pulse': 'Пульсация',
        'hooks': 'Зацепки',
        'circuit': 'Микросхемы',
        'grid': 'Сетка',
        'dots': 'Точки',
        'lines': 'Линии',
        'hexagon': 'Шестиугольники',
        'triangles': 'Треугольники',
        'bubbles': 'Пузыри',
        'stars': 'Звёзды',
        'rain': 'Дождь',
        'glitch': 'Глитч',
        'matrix': 'Матрица',
        'spiral': 'Спираль',
        'nebula': 'Туманность',
        'cyberpunk': 'Киберпанк',
        'fractal': 'Фрактал',
        'circuit2': 'Микросхема 2',
        'laser': 'Лазеры',
        'scanlines': 'Сканлайны',
        'vortex': 'Воронка'
    };
    
    return names[bg] || bg;
}

// Инициализация навигации
function initNavigation() {
    // Открытие/закрытие бокового меню
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const sideMenu = document.getElementById('side-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sideMenu.classList.add('active');
        });
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            sideMenu.classList.remove('active');
        });
    }
    
    // Переключение секций
    const navTabs = document.querySelectorAll('.nav-tab');
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.section');
    
    function switchSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active-section');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active-section');
        }
        
        navTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.section === sectionId) {
                tab.classList.add('active');
            }
        });
        
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === sectionId) {
                item.classList.add('active');
            }
        });
    }
    
    navTabs.forEach(tab => {
        if (tab.dataset.section) {
            tab.addEventListener('click', () => {
                switchSection(tab.dataset.section);
            });
        }
    });
    
    menuItems.forEach(item => {
        if (item.dataset.section) {
            item.addEventListener('click', () => {
                switchSection(item.dataset.section);
                sideMenu.classList.remove('active');
            });
        }
    });
    
    // Специальные кнопки
    const faqBtn = document.getElementById('faq-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const menuSettings = document.getElementById('menu-settings');
    const animatedBgBtn = document.getElementById('animated-bg-btn');
    const menuAnimatedBg = document.getElementById('menu-animated-bg');
    
    if (faqBtn) {
        faqBtn.addEventListener('click', () => {
            switchSection('faq-section');
        });
    }
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            openModal('settings-modal');
        });
    }
    
    if (menuSettings) {
        menuSettings.addEventListener('click', () => {
            openModal('settings-modal');
            sideMenu.classList.remove('active');
        });
    }
    
    if (animatedBgBtn) {
        animatedBgBtn.addEventListener('click', () => {
            openModal('animated-bg-modal');
        });
    }
    
    if (menuAnimatedBg) {
        menuAnimatedBg.addEventListener('click', () => {
            openModal('animated-bg-modal');
            sideMenu.classList.remove('active');
        });
    }
}

// Инициализация участников
function initMembers() {
    loadMembers();
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterMembers(category);
        });
    });
    
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            searchMembers(searchTerm);
        });
    }
}

// Загрузка участников
function loadMembers() {
    const container = document.getElementById('members-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    const sortedMembers = [...members].sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0;
    });
    
    sortedMembers.forEach(member => {
        const card = createMemberCard(member);
        container.appendChild(card);
    });
    
    document.querySelectorAll('.member-card').forEach(card => {
        card.addEventListener('click', function() {
            const memberId = this.dataset.id;
            showProfile(memberId);
        });
    });
}

// Создание карточки участника
function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';
    card.dataset.id = member.id;
    card.dataset.category = member.category;
    
    if (member.pinned) card.classList.add('pinned');
    if (member.verified) card.classList.add('verified');
    
    card.innerHTML = `
        <div class="member-avatar">
            <img src="${member.avatar}" alt="${member.nickname}" onerror="this.src='https://via.placeholder.com/70/2a2a2a/888?text=S'">
        </div>
        
        <div class="member-info">
            <h3>${member.nickname} ${member.verified ? '✓' : ''}</h3>
            <div class="member-role">${member.role}</div>
            <p class="member-description">${member.description}</p>
            <div style="margin-top: 10px; font-size: 12px; color: #666;">
                📍 Закреплен | ✓ Верифицирован
            </div>
        </div>
    `;
    
    return card;
}

// Фильтрация участников
function filterMembers(category) {
    const cards = document.querySelectorAll('.member-card');
    
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 10);
        } else {
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Поиск участников
function searchMembers(term) {
    const cards = document.querySelectorAll('.member-card');
    const activeFilter = document.querySelector('.filter-btn.active').dataset.category;
    
    cards.forEach(card => {
        const nickname = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.member-description').textContent.toLowerCase();
        
        const matchesSearch = nickname.includes(term) || description.includes(term);
        const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
        
        if (matchesSearch && matchesFilter) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 10);
        } else {
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ПОЛНЫЙ ПРОФИЛЬ ВЛАДЕЛЬЦА
function showProfile(memberId) {
    const member = members.find(m => m.id == memberId);
    if (!member) return;
    
    const container = document.getElementById('profile-content');
    
    // Форматирование даты
    const joinDate = new Date(member.joinDate);
    const formattedDate = joinDate.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    container.innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar">
                <img src="${member.avatar}" alt="${member.nickname}" onerror="this.src='https://via.placeholder.com/120/2a2a2a/fff?text=S'">
            </div>
            
            <h1 class="profile-title">${member.nickname}</h1>
            <p class="profile-username">${member.username}</p>
            
            <div class="profile-badges">
                <span class="badge verified">✓ Верифицирован</span>
                <span class="badge pinned">📌 Закреплён</span>
                <span class="badge category">${member.category}</span>
                <span class="badge">Владелец</span>
            </div>
            
            <div class="profile-actions">
                <a href="${member.telegram.startsWith('http') ? member.telegram : 'https://t.me/' + member.telegram}" 
                   class="action-btn telegram" target="_blank">
                    <i class="fab fa-telegram"></i> Написать в ЛС
                </a>
                <a href="${member.project}" class="action-btn" target="_blank">
                    <i class="fas fa-external-link-alt"></i> Проект (Канал)
                </a>
                <a href="${member.chat}" class="action-btn telegram" target="_blank">
                    <i class="fas fa-comments"></i> Чат
                </a>
                <button class="action-btn" onclick="copyProfileLink('${member.nickname}')">
                    <i class="fas fa-share"></i> Поделиться
                </button>
            </div>
        </div>
        
        <div class="profile-content">
            <div class="profile-description">
                <h3>Описание</h3>
                <p>${member.description}</p>
                
                <h3 style="margin-top: 30px;">Услуги и цены</h3>
                <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px; margin: 15px 0;">
                    <p><strong>Вход в фейм-лист:</strong> ${member.priceEntry}</p>
                    <p><strong>Галочка (верификация):</strong> ${member.priceVerified}</p>
                    <p><strong>Закреп профиля:</strong> ${member.pricePinned}</p>
                    <p><em>Оплата только через Telegram. По всем вопросам пишите в ЛС.</em></p>
                </div>
                
                ${member.details ? `<p><strong>Детали:</strong> ${member.details}</p>` : ''}
                
                <h3 style="margin-top: 30px;">Навыки и специализация</h3>
                <p>${member.skills ? member.skills.join(' • ') : 'Не указано'}</p>
                
                <h3 style="margin-top: 30px;">Контакты</h3>
                <div class="profile-actions">
                    <a href="https://t.me/${member.telegram.replace('@', '')}" 
                       class="action-btn telegram" target="_blank">
                        <i class="fab fa-telegram"></i> Telegram ЛС
                    </a>
                    <a href="${member.project}" class="action-btn" target="_blank">
                        <i class="fab fa-telegram"></i> Основной канал
                    </a>
                    <a href="${member.chat}" class="action-btn telegram" target="_blank">
                        <i class="fab fa-telegram"></i> Общий чат
                    </a>
                </div>
            </div>
            
            <div class="profile-stats">
                <h3>Статистика</h3>
                <div class="stat-item">
                    <span class="stat-label">Статус:</span>
                    <span class="stat-value">Владелец</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Верификация:</span>
                    <span class="stat-value">✓ Подтверждён</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Закреп:</span>
                    <span class="stat-value">📌 Включён</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Дата регистрации:</span>
                    <span class="stat-value">${formattedDate}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Активность:</span>
                    <span class="stat-value">${member.activity}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Публикации:</span>
                    <span class="stat-value">${member.posts}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Подписчики:</span>
                    <span class="stat-value">${member.followers.toLocaleString()}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">ID:</span>
                    <span class="stat-value">${member.id}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Цена входа:</span>
                    <span class="stat-value">${member.priceEntry}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Цена галочки:</span>
                    <span class="stat-value">${member.priceVerified}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Цена закрепа:</span>
                    <span class="stat-value">${member.pricePinned}</span>
                </div>
            </div>
        </div>
    `;
    
    switchSection('profile-details');
}

// Остальные функции остаются без изменений (initSnow, initSettings, initNeonControls, initAnimatedBg, initModals, loadSavedSettings, initDynamicNeon, applyAnimatedBg и т.д.)
// ... [Здесь должен быть остальной код из предыдущего ответа, начиная с initSnow() и до конца файла] ...

// Для экономии места, ниже привожу только измененные или важные функции,
// остальной код (initSnow, initSettings, initNeonControls, initAnimatedBg, applyAnimatedBg, initModals, openModal, closeModal, loadSavedSettings, applyTheme) 
// оставляем без изменений из предыдущего ответа

// Инициализация снега (оставить без изменений)
function initSnow() {
    const snowContainer = document.querySelector('.snow-container');
    if (!snowContainer) return;
    
    createSnowflakes();
    
    const snowToggle = document.getElementById('snow-effect');
    if (snowToggle) {
        snowToggle.addEventListener('change', function() {
            if (this.checked) {
                snowContainer.style.display = 'block';
                createSnowflakes();
            } else {
                snowContainer.style.display = 'none';
                snowContainer.innerHTML = '';
            }
        });
    }
}

// Создание снежинок (оставить без изменений)
function createSnowflakes() {
    const snowContainer = document.querySelector('.snow-container');
    if (!snowContainer) return;
    
    snowContainer.innerHTML = '';
    
    for (let i = 0; i < 60; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * 100;
        const duration = Math.random() * 5 + 5;
        const opacity = Math.random() * 0.5 + 0.3;
        
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${startX}vw`;
        snowflake.style.opacity = opacity;
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        snowflake.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
        
        snowContainer.appendChild(snowflake);
    }
}

// Инициализация настроек (оставить без изменений)
function initSettings() {
    const settingsTabs = document.querySelectorAll('.settings-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    settingsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab + '-tab';
            
            settingsTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.dataset.theme;
            
            themeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            applyTheme(theme);
        });
    });
    
    const bgUpload = document.getElementById('bg-upload');
    const bgPreview = document.getElementById('bg-preview');
    
    if (bgUpload) {
        bgUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    bgPreview.innerHTML = `<img src="${e.target.result}" alt="Фон">`;
                    bgPreview.style.display = 'block';
                    
                    localStorage.setItem('fame_background', e.target.result);
                    document.body.style.backgroundImage = `url(${e.target.result})`;
                    document.body.style.backgroundSize = 'cover';
                    document.body.style.backgroundAttachment = 'fixed';
                    document.body.style.backgroundPosition = 'center';
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    const neonFlowEffect = document.getElementById('neon-flow-effect');
    if (neonFlowEffect) {
        neonFlowEffect.addEventListener('change', function() {
            if (this.checked) {
                initDynamicNeon();
            } else {
                removeNeonFlow();
            }
        });
    }
}

// Инициализация контролов неона (оставить без изменений)
function initNeonControls() {
    const neonColor = document.getElementById('neon-color');
    const neonIntensity = document.getElementById('neon-intensity');
    const neonSpeed = document.getElementById('neon-speed');
    const applyNeonBtn = document.getElementById('apply-neon');
    const intensityValue = document.getElementById('intensity-value');
    const speedValue = document.getElementById('speed-value');
    const colorPreview = document.getElementById('neon-color-preview');
    
    if (neonColor && colorPreview) {
        neonColor.addEventListener('input', function() {
            colorPreview.style.backgroundColor = this.value;
        });
        colorPreview.style.backgroundColor = neonColor.value;
    }
    
    if (neonIntensity && intensityValue) {
        neonIntensity.addEventListener('input', function() {
            intensityValue.textContent = this.value + '%';
        });
        intensityValue.textContent = neonIntensity.value + '%';
    }
    
    if (neonSpeed && speedValue) {
        const speedLabels = {
            1: 'Очень медленно',
            2: 'Медленно',
            3: 'Немного медленно',
            4: 'Ниже средней',
            5: 'Средняя',
            6: 'Выше средней',
            7: 'Быстро',
            8: 'Очень быстро',
            9: 'Супер быстро',
            10: 'Максимальная'
        };
        
        neonSpeed.addEventListener('input', function() {
            speedValue.textContent = speedLabels[this.value] || 'Средняя';
        });
        speedValue.textContent = speedLabels[neonSpeed.value] || 'Средняя';
    }
    
    if (applyNeonBtn) {
        applyNeonBtn.addEventListener('click', function() {
            const color = neonColor.value;
            const intensity = parseInt(neonIntensity.value) / 100;
            const speed = parseInt(neonSpeed.value);
            
            applyNeonSettings(color, intensity, speed);
        });
    }
}

// Применение настроек неона (оставить без изменений)
function applyNeonSettings(color, intensity, speed) {
    currentNeonColor = color;
    currentNeonIntensity = intensity;
    currentNeonSpeed = speed;
    
    localStorage.setItem('fame_neon_color', color);
    localStorage.setItem('fame_neon_intensity', intensity);
    localStorage.setItem('fame_neon_speed', speed);
    
    initDynamicNeon();
}

// Динамический неон (оставить без изменений)
function initDynamicNeon() {
    const oldStyle = document.getElementById('dynamic-neon-style');
    if (oldStyle) oldStyle.remove();
    
    const hex = currentNeonColor;
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    
    const duration = (11 - currentNeonSpeed) + 's';
    
    const style = document.createElement('style');
    style.id = 'dynamic-neon-style';
    
    style.textContent = `
        @keyframes neonFlow {
            0%, 100% { 
                box-shadow: 0 0 ${10 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.8 * currentNeonIntensity}),
                          0 0 ${20 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.6 * currentNeonIntensity}),
                          0 0 ${30 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.4 * currentNeonIntensity}),
                          inset 0 0 ${10 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.5 * currentNeonIntensity}); 
            }
            50% { 
                box-shadow: 0 0 ${15 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.9 * currentNeonIntensity}),
                          0 0 ${25 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.7 * currentNeonIntensity}),
                          0 0 ${35 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.5 * currentNeonIntensity}),
                          inset 0 0 ${15 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.6 * currentNeonIntensity}); 
            }
        }
        
        @keyframes textNeonFlow {
            0%, 100% { 
                text-shadow: 0 0 ${5 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.8 * currentNeonIntensity}),
                           0 0 ${10 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.6 * currentNeonIntensity}); 
            }
            50% { 
                text-shadow: 0 0 ${8 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.9 * currentNeonIntensity}),
                           0 0 ${15 * currentNeonIntensity}px rgba(${r}, ${g}, ${b}, ${0.7 * currentNeonIntensity}); 
            }
        }
        
        .neon-flow {
            animation: neonFlow ${duration} ease-in-out infinite !important;
        }
        
        .text-neon-flow {
            animation: textNeonFlow ${duration} ease-in-out infinite !important;
        }
    `;
    
    document.head.appendChild(style);
    
    const neonFlowEffect = document.getElementById('neon-flow-effect');
    if (neonFlowEffect && neonFlowEffect.checked) {
        applyNeonToElements();
    }
}

// Применение неона к элементам (оставить без изменений)
function applyNeonToElements() {
    document.querySelectorAll('.member-card').forEach(card => {
        card.classList.add('neon-flow');
    });
    
    document.querySelectorAll('.modal-content').forEach(modal => {
        modal.classList.add('neon-flow');
    });
    
    document.querySelectorAll('.upload-btn').forEach(btn => {
        btn.classList.add('neon-flow');
    });
    
    const profileHeader = document.querySelector('.profile-header');
    if (profileHeader) {
        profileHeader.classList.add('neon-flow');
    }
}

// Удаление эффекта переливания (оставить без изменений)
function removeNeonFlow() {
    document.querySelectorAll('.neon-flow').forEach(el => {
        el.classList.remove('neon-flow');
    });
    document.querySelectorAll('.text-neon-flow').forEach(el => {
        el.classList.remove('text-neon-flow');
    });
}

// Инициализация анимированного фона (немного изменена)
function initAnimatedBg() {
    const bgSpeed = document.getElementById('bg-speed');
    const bgOpacity = document.getElementById('bg-opacity');
    const applyBgBtn = document.getElementById('apply-animated-bg');
    
    // Настройка скорости
    if (bgSpeed) {
        bgSpeed.addEventListener('input', function() {
            currentBgSpeed = parseInt(this.value);
        });
    }
    
    // Настройка прозрачности
    if (bgOpacity) {
        bgOpacity.addEventListener('input', function() {
            currentBgOpacity = parseInt(this.value) / 100;
        });
    }
    
    // Применение фона
    if (applyBgBtn) {
        applyBgBtn.addEventListener('click', applyAnimatedBg);
    }
}

// Применение анимированного фона (немного изменена)
function applyAnimatedBg() {
    const bgElement = document.getElementById('animated-bg');
    
    // Удаляем все классы фонов
    allBackgrounds.forEach(bg => {
        bgElement.classList.remove(`${bg}-bg`);
    });
    
    // Добавляем выбранный фон
    bgElement.classList.add(`${currentAnimatedBg}-bg`);
    
    // Настраиваем скорость анимации
    const speed = currentBgSpeed / 10;
    bgElement.style.animationDuration = `${20 / speed}s`;
    
    // Настраиваем прозрачность
    bgElement.style.opacity = currentBgOpacity;
    
    // Сохраняем настройки
    localStorage.setItem('fame_animated_bg', currentAnimatedBg);
    localStorage.setItem('fame_bg_speed', currentBgSpeed);
    localStorage.setItem('fame_bg_opacity', currentBgOpacity);
}

// Инициализация модальных окон (оставить без изменений)
function initModals() {
    const settingsBtns = document.querySelectorAll('#settings-btn, #menu-settings');
    
    settingsBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                openModal('settings-modal');
            });
        }
    });
    
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            closeModal(this.closest('.modal'));
        });
    });
    
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });
}

// Открытие модального окна (оставить без изменений)
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Закрытие модального окна (оставить без изменений)
function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Загрузка сохраненных настроек (немного изменена)
function loadSavedSettings() {
    // Тема
    const savedTheme = localStorage.getItem('fame_theme');
    if (savedTheme) {
        const themeOption = document.querySelector(`.theme-option[data-theme="${savedTheme}"]`);
        if (themeOption) {
            themeOption.click();
        }
    }
    
    // Фон
    const savedBg = localStorage.getItem('fame_background');
    if (savedBg) {
        document.body.style.backgroundImage = `url(${savedBg})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundPosition = 'center';
    }
    
    // Настройки неона
    const savedNeonColor = localStorage.getItem('fame_neon_color') || '#808080';
    const savedNeonIntensity = parseFloat(localStorage.getItem('fame_neon_intensity')) || 0.5;
    const savedNeonSpeed = parseInt(localStorage.getItem('fame_neon_speed')) || 5;
    
    const neonColor = document.getElementById('neon-color');
    const neonIntensity = document.getElementById('neon-intensity');
    const neonSpeed = document.getElementById('neon-speed');
    
    if (neonColor) neonColor.value = savedNeonColor;
    if (neonIntensity) neonIntensity.value = savedNeonIntensity * 100;
    if (neonSpeed) neonSpeed.value = savedNeonSpeed;
    
    applyNeonSettings(savedNeonColor, savedNeonIntensity, savedNeonSpeed);
    
    // Анимированный фон
    const savedAnimatedBg = localStorage.getItem('fame_animated_bg') || 'hooks';
    const savedBgSpeed = parseInt(localStorage.getItem('fame_bg_speed')) || 10;
    const savedBgOpacity = parseFloat(localStorage.getItem('fame_bg_opacity')) || 0.5;
    
    currentAnimatedBg = savedAnimatedBg;
    currentBgSpeed = savedBgSpeed;
    currentBgOpacity = savedBgOpacity;
    
    const bgSpeed = document.getElementById('bg-speed');
    const bgOpacity = document.getElementById('bg-opacity');
    
    if (bgSpeed) bgSpeed.value = savedBgSpeed;
    if (bgOpacity) bgOpacity.value = savedBgOpacity * 100;
    
    applyAnimatedBg();
    
    // Эффект переливания
    const savedNeonFlow = localStorage.getItem('fame_neon_flow');
    const neonFlowCheckbox = document.getElementById('neon-flow-effect');
    if (neonFlowCheckbox) {
        if (savedNeonFlow === 'disabled') {
            neonFlowCheckbox.checked = false;
            removeNeonFlow();
        } else {
            neonFlowCheckbox.checked = true;
        }
    }
    
    // Снег
    const savedSnow = localStorage.getItem('fame_snow');
    const snowCheckbox = document.getElementById('snow-effect');
    if (snowCheckbox) {
        if (savedSnow === 'disabled') {
            snowCheckbox.checked = false;
            document.querySelector('.snow-container').style.display = 'none';
        } else {
            snowCheckbox.checked = true;
        }
    }
}

// Применение темы (оставить без изменений)
function applyTheme(theme) {
    currentTheme = theme;
    
    const themeClasses = ['dark-theme', 'black-theme', 'red-theme', 'red-black-theme', 
                         'red-gray-theme', 'purple-theme', 'blue-theme', 'green-theme', 
                         'orange-theme', 'pink-theme'];
    
    document.body.classList.remove(...themeClasses);
    document.body.classList.add(theme + '-theme');
    
    localStorage.setItem('fame_theme', theme);
}

// Глобальные функции
window.copyProfileLink = function(username) {
    const link = `https://t.me/+UO-WJgp_j65iYjA6?text=Смотри%20профиль%20${encodeURIComponent(username)}`;
    navigator.clipboard.writeText(link).then(() => {
        alert('Ссылка на профиль скопирована в буфер обмена!');
    });
};

// Сохранение настроек при изменении
document.getElementById('snow-effect')?.addEventListener('change', function() {
    localStorage.setItem('fame_snow', this.checked ? 'enabled' : 'disabled');
});

document.getElementById('neon-flow-effect')?.addEventListener('change', function() {
    localStorage.setItem('fame_neon_flow', this.checked ? 'enabled' : 'disabled');
    if (this.checked) {
        initDynamicNeon();
    } else {
        removeNeonFlow();
    }
});

// Функция переключения секций
function switchSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active-section');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active-section');
    }
    
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.section === sectionId) {
            tab.classList.add('active');
        }
    });
}