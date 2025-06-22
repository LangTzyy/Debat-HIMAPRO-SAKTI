let currentCard = null;

const themes = {
    1: {
        title: "Program Kerja",
        subtitle: "Strategi program kerja unggulan dan dampaknya bagi mahasiswa",
        cases: [
            {
                title: "A",
                description: "Apa program kerja unggulan yang akan Anda jalankan?"
            },
            {
                title: "B",
                description: "Apa langkah awal Anda untuk menyusun program kerja yang berdampak kepada mahasiswa TI?"
            }
        ]
    },
    2: {
        title: "Kepemimpinan",
        subtitle: "Gaya kepemimpinan dan pengambilan keputusan dalam organisasi",
        cases: [
            {
                title: "A",
                description: "Jika anda menjadi seorang ketua umum karakter kepemimpinan seperti apa yang akan digunakan di SAKTI?"
            },
            {
                title: "B",
                description: "Bagaimana Anda menyikapi perbedaan pendapat dalam rapat atau pengurus?"
            }
        ]
    },
    3: {
        title: "Manajemen Organisasi",
        subtitle: "Pelibatan anggota dan evaluasi kinerja organisasi",
        cases: [
            {
                title: "A",
                description: "Bagaimana cara anda membuat setiap anggota menjadi proaktif dan terlibat langsung dalam suatu kegiatan?"
            },
            {
                title: "B",
                description: "Siapa saja yang akan libatkan dalam evaluasi tahunan SAKTI?"
            }
        ]
    },
    4: {
        title: "Komunikasi Internal",
        subtitle: "Sistem komunikasi yang terbuka dan koordinatif antar departemen",
        cases: [
            {
                title: "A",
                description: "Apakah Anda terbuka dengan kritik dari anggota? Bagaimana Anda akan menampungnya?"
            },
            {
                title: "B",
                description: "Bagaimana cara anda mengatur komunikasi dan koordinasi program kerja antar departemen agar tidak bentrok?"
            }
        ]
    },
    5: {
        title: "Hubungan Eksternal",
        subtitle: "Strategi membangun citra dan menjalin kerja sama eksternal",
        cases: [
            {
                title: "A",
                description: "Langkah apa yang akan anda lakukan untuk memperkuat branding SAKTI? Dan bagaimana anda membangun relasi dengan pihak eksternal?"
            },
            {
                title: "B",
                description: "Bagaimana Anda menilai pentingnya kolaborasi dengan demis SAKTI?"
            }
        ]
    },
    6: {
        title: "Keuangan",
        subtitle: "Pengelolaan keuangan dan efisiensi anggaran organisasi",
        cases: [
            {
                title: "A",
                description: "Apa yang akan anda lakukan jika menjadi ketua umum untuk meningkatkan keuangan SAKTI?"
            },
            {
                title: "B",
                description: "Jika terjadi kekurangan dana, bagaimana strategi Anda menyesuaikan kegiatan?"
            }
        ]
    },
    7: {
        title: "Manajemen SDM",
        subtitle: "Pengembangan potensi individu dan penyelesaian konflik internal",
        cases: [
            {
                title: "A",
                description: "Bagaimana cara Anda mengenali dan mengembangkan potensi tiap anggota tim?"
            },
            {
                title: "B",
                description: "Apa yang akan anda lakukan jika terjadi konflik antar anggota pengurus? Jelaskan pendekatan dan langkah-langkah penyelesaiannya?"
            }
        ]
    },
    8: {
        title: "Kekeluargaan & Solidaritas",
        subtitle: "Membangun kedekatan tanpa mengabaikan profesionalitas",
        cases: [
            {
                title: "A",
                description: "Apa inisiatif Anda untuk memperkuat hubungan personal antar pengurus?"
            },
            {
                title: "B",
                description: "Bagaimana menjaga agar kekeluargaan tidak mengganggu profesionalitas kerja?"
            }
        ]
    }
};

// Particle animation system
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 8 + 5) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    particle.style.animation = `particleFloat ${Math.random() * 8 + 5}s linear infinite`;
    
    document.querySelector('.animated-background').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 15000);
}

// Create particles periodically
setInterval(createParticle, 300);

// Initialize some particles
for (let i = 0; i < 20; i++) {
    setTimeout(createParticle, i * 100);
}

function openModal(cardElement) {
    if (cardElement.classList.contains('disabled')) return;

    currentCard = cardElement;
    const cardId = parseInt(cardElement.dataset.id);
    const theme = themes[cardId];
    if (!theme) return;

    // Isi modal
    document.getElementById('modalTitle').textContent = theme.title;
    document.getElementById('modalSubtitle').textContent = theme.subtitle;

    const caseStudiesContainer = document.getElementById('caseStudies');
    caseStudiesContainer.innerHTML = '';
    theme.cases.forEach(caseStudy => {
        const caseDiv = document.createElement('div');
        caseDiv.className = 'case-study';
        caseDiv.innerHTML = `
            <h3>${caseStudy.title}</h3>
            <p>${caseStudy.description}</p>
        `;
        caseStudiesContainer.appendChild(caseDiv);
    });

    // Tampilkan modal
    document.getElementById('modal').style.display = 'block';

    // Blok scroll halaman secara konsisten
    document.body.classList.add('modal-open');

    // Tandai kartu sudah dibuka
    cardElement.classList.add('disabled');

    // Scroll ke atas
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.body.classList.remove('modal-open'); // Hapus class yang memblokir scroll
    currentCard = null;
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal();
    }
}

// Add 3D tilt effect to cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
});