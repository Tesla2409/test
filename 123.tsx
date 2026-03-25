"use client";

import { useRef, useState } from "react";

type Screen = "home" | "slide1" | "slide2";

type CardItem = {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  clickable?: boolean;
  bg?: string;
};

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home");
  const [slide1Image, setSlide1Image] = useState<string | null>(null);
  const [slide2Image, setSlide2Image] = useState<string | null>(null);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const fileRef1 = useRef<HTMLInputElement | null>(null);
  const fileRef2 = useRef<HTMLInputElement | null>(null);
  const yesSoundRef = useRef<HTMLAudioElement | null>(null);

  const cards: CardItem[] = [
    {
      id: 1,
      title: "Special Day",
      subtitle: "klik card ini untuk mulai game valentine 💗",
      emoji: "💌",
      clickable: true,
      bg: "linear-gradient(180deg, #fffefe 0%, #fff7f8 100%)",
    },
    {
      id: 2,
      title: "Valentine Card",
      subtitle: "coming soon",
      emoji: "💖",
      bg: "linear-gradient(180deg, #f9e7eb 0%, #f6dde3 100%)",
    },
    {
      id: 3,
      title: "Cute Message",
      subtitle: "coming soon",
      emoji: "🌸",
      bg: "linear-gradient(180deg, #f8e8ef 0%, #f4dde7 100%)",
    },
    {
      id: 4,
      title: "Love Note",
      subtitle: "coming soon",
      emoji: "💗",
      bg: "linear-gradient(180deg, #f8e7ec 0%, #f4dde3 100%)",
    },
    {
      id: 5,
      title: "Pink Theme",
      subtitle: "coming soon",
      emoji: "🎀",
      bg: "linear-gradient(180deg, #f8e8ee 0%, #f5e0e8 100%)",
    },
    {
      id: 6,
      title: "Sweet Theme",
      subtitle: "coming soon",
      emoji: "🍓",
      bg: "linear-gradient(180deg, #f9e9ee 0%, #f5dfe7 100%)",
    },
    {
      id: 7,
      title: "Soft Heart",
      subtitle: "coming soon",
      emoji: "💞",
      bg: "linear-gradient(180deg, #f8e8ec 0%, #f3dde2 100%)",
    },
    {
      id: 8,
      title: "Mini Card",
      subtitle: "coming soon",
      emoji: "💘",
      bg: "linear-gradient(180deg, #f7e8ed 0%, #f2dde4 100%)",
    },
  ];

  function pickSlide1Image() {
    fileRef1.current?.click();
  }

  function pickSlide2Image() {
    fileRef2.current?.click();
  }

  function onImage1(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setSlide1Image(reader.result as string);
    reader.readAsDataURL(file);
  }

  function onImage2(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setSlide2Image(reader.result as string);
    reader.readAsDataURL(file);
  }

  function resetToHome() {
    setScreen("home");
    setSlide1Image(null);
    setSlide2Image(null);
    setNoPos({ x: 0, y: 0 });
    if (fileRef1.current) fileRef1.current.value = "";
    if (fileRef2.current) fileRef2.current.value = "";
  }

  function moveNo() {
    const randomX = Math.random() * 320 - 160;
    const randomY = Math.random() * 140 - 70;
    setNoPos({ x: randomX, y: randomY });
  }

  function heartBoom() {
    yesSoundRef.current?.play().catch(() => {});

    for (let i = 0; i < 20; i++) {
      const heart = document.createElement("div");
      heart.innerText = "💖";
      heart.style.position = "fixed";
      heart.style.left = "50%";
      heart.style.top = "58%";
      heart.style.transform = "translate(-50%, -50%)";
      heart.style.fontSize = "28px";
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "9999";
      heart.style.transition = "all 900ms ease-out";
      document.body.appendChild(heart);

      const dx = Math.random() * 360 - 180;
      const dy = Math.random() * 240 - 120;
      const rotate = Math.random() * 220 - 110;

      requestAnimationFrame(() => {
        heart.style.transform = `translate(${dx}px, ${dy}px) rotate(${rotate}deg) scale(1.3)`;
        heart.style.opacity = "0";
      });

      setTimeout(() => heart.remove(), 950);
    }
  }

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f6dfe4 0%, #f2dade 100%)",
    fontFamily: "'Trebuchet MS', 'Verdana', sans-serif",
    boxSizing: "border-box",
  };

  const headerBar: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.55)",
    borderBottom: "1px solid rgba(255,255,255,0.8)",
    padding: "18px 28px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  };

  const headerTitle: React.CSSProperties = {
    color: "#bb4e68",
    fontWeight: 800,
    fontSize: "20px",
    letterSpacing: "0.2px",
  };

  const uploadBox = (img: string | null): React.CSSProperties => ({
    width: "220px",
    height: "220px",
    borderRadius: "24px",
    border: img ? "none" : "2px dashed rgba(236, 130, 150, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    cursor: "pointer",
    background: img ? "transparent" : "rgba(255,255,255,0.18)",
  });

  if (screen === "home") {
    return (
      <main style={pageStyle}>
        <style>{`
          .card-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 22px;
          }

          @media (max-width: 1100px) {
            .card-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
          }

          @media (max-width: 820px) {
            .card-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 560px) {
            .card-grid {
              grid-template-columns: repeat(1, minmax(0, 1fr));
            }
          }
        `}</style>

        <audio src="/music/romantic.mp3" autoPlay loop />

        <div style={headerBar}>
          <div style={headerTitle}>For Someone&apos;s Special 💖</div>
        </div>

        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "32px 28px 40px",
            boxSizing: "border-box",
          }}
        >
          <div className="card-grid">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => {
                  if (card.clickable) setScreen("slide1");
                }}
                style={{
                  minHeight: "430px",
                  borderRadius: "26px",
                  border: "1px solid rgba(255,255,255,0.55)",
                  background: card.bg,
                  boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                  padding: "24px",
                  cursor: card.clickable ? "pointer" : "default",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.18s ease",
                }}
              >
                <div
                  style={{
                    width: "110px",
                    height: "110px",
                    borderRadius: "24px",
                    background: "#f3d5dc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "50px",
                    marginBottom: "18px",
                  }}
                >
                  {card.emoji}
                </div>

                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 800,
                    color: "#d2526b",
                    lineHeight: 1.1,
                    marginBottom: "10px",
                  }}
                >
                  {card.title}
                </div>

                <div
                  style={{
                    fontSize: "15px",
                    color: "#c96f82",
                    lineHeight: 1.5,
                    textAlign: "center",
                  }}
                >
                  {card.subtitle}
                </div>
              </button>
            ))}
          </div>
        </div>

        <input
          ref={fileRef1}
          type="file"
          accept="image/*"
          onChange={onImage1}
          style={{ display: "none" }}
        />
        <input
          ref={fileRef2}
          type="file"
          accept="image/*"
          onChange={onImage2}
          style={{ display: "none" }}
        />
      </main>
    );
  }

  if (screen === "slide1") {
    return (
      <main
        style={{
          ...pageStyle,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "30px 24px 40px",
          position: "relative",
        }}
      >
        <button
          onClick={() => setScreen("home")}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            width: "42px",
            height: "42px",
            borderRadius: "999px",
            border: "1px solid rgba(0,0,0,0.06)",
            background: "rgba(255,255,255,0.82)",
            cursor: "pointer",
            color: "#d65c73",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            fontSize: "18px",
          }}
        >
          ←
        </button>

        <div onClick={pickSlide1Image} style={uploadBox(slide1Image)}>
          {slide1Image ? (
            <img
              src={slide1Image}
              alt="slide 1"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                color: "#cf7788",
                fontSize: "18px",
                fontWeight: 700,
                lineHeight: 1.6,
              }}
            >
              Klik gambar
            </div>
          )}
        </div>

        <div
          style={{
            color: "#e04e4e",
            fontSize: "46px",
            fontWeight: 800,
            lineHeight: 1.22,
            marginTop: "26px",
            marginBottom: "36px",
            maxWidth: "860px",
          }}
        >
          Sayang, Mau jadi Valentine-ku? 💖
        </div>

        <div
          style={{
            position: "relative",
            width: "540px",
            height: "120px",
            maxWidth: "100%",
          }}
        >
          <button
            onClick={() => {
              heartBoom();
              setTimeout(() => setScreen("slide2"), 180);
            }}
            style={{
              position: "absolute",
              left: "calc(50% - 105px)",
              top: "20px",
              transform: "translateX(-50%)",
              minWidth: "112px",
              padding: "14px 22px",
              borderRadius: "999px",
              border: "none",
              background: "linear-gradient(180deg, #f6b3c3 0%, #ef9fb3 100%)",
              color: "#b43d59",
              fontSize: "20px",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 8px 18px rgba(232, 140, 164, 0.28)",
            }}
          >
            Iya 💕
          </button>

          <button
            onMouseEnter={moveNo}
            onMouseMove={moveNo}
            style={{
              position: "absolute",
              left: `calc(50% + 105px + ${noPos.x}px)`,
              top: "20px",
              transform: `translate(-50%, ${noPos.y}px)`,
              minWidth: "112px",
              padding: "14px 22px",
              borderRadius: "999px",
              border: "none",
              background: "#f2efe8",
              color: "#8d725f",
              fontSize: "20px",
              fontWeight: 800,
              cursor: "pointer",
              transition: "left 0.14s ease, transform 0.14s ease",
            }}
          >
            Nggak
          </button>
        </div>

        <input
          ref={fileRef1}
          type="file"
          accept="image/*"
          onChange={onImage1}
          style={{ display: "none" }}
        />
      </main>
    );
  }

  return (
    <main
      style={{
        ...pageStyle,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "30px 24px 50px",
        position: "relative",
      }}
    >
      <button
        onClick={() => setScreen("slide1")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "42px",
          height: "42px",
          borderRadius: "999px",
          border: "1px solid rgba(0,0,0,0.06)",
          background: "rgba(255,255,255,0.82)",
          cursor: "pointer",
          color: "#d65c73",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          fontSize: "18px",
        }}
      >
        ←
      </button>

      <div
        style={{
          color: "#e04e4e",
          fontSize: "42px",
          fontWeight: 800,
          lineHeight: 1.22,
          marginBottom: "26px",
          maxWidth: "860px",
        }}
      >
        Aku tahu kamu pasti bilang iya!
      </div>

      <div onClick={pickSlide2Image} style={uploadBox(slide2Image)}>
        {slide2Image ? (
          <img
            src={slide2Image}
            alt="slide 2"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              color: "#cf7788",
              fontSize: "18px",
              fontWeight: 700,
              lineHeight: 1.6,
            }}
          >
            Klik gambar
          </div>
        )}
      </div>

      <button
        onClick={resetToHome}
        style={{
          marginTop: "42px",
          padding: "14px 26px",
          borderRadius: "999px",
          border: "none",
          background: "#e24949",
          color: "white",
          fontWeight: 800,
          fontSize: "18px",
          cursor: "pointer",
          boxShadow: "0 8px 18px rgba(226, 73, 73, 0.22)",
        }}
      >
        Kembali ke halaman utama
      </button>

      <input
        ref={fileRef2}
        type="file"
        accept="image/*"
        onChange={onImage2}
        style={{ display: "none" }}
      />
    </main>
  );
}