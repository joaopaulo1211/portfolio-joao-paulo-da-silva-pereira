@import "tailwindcss";

@theme {
  --color-teal-500: #0d9488;
}

.qr-description {
  @apply flex items-center justify-center text-center;
  font-size: 21px;
}

/* Custom Teal Glow para elementos UI */
.glow-teal {
  box-shadow: 0 0 20px rgba(13, 148, 136, 0.3);
}

body {
  @apply antialiased;
}
