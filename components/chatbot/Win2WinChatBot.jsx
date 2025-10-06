"use client"

import ChatBot from "react-chatbotify";

// Custom icon components
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
);

const Win2WinChatBot = () => {
  const flow = {
    start: {
      message:
        "Bonjour ! 👋 Je suis l'assistant virtuel de Win TO Win Formation. Comment puis-je vous aider aujourd'hui ?",
      options: ["📚 Formations", "🎯 Services", "📞 Contact", "📝 Inscription", "🕒 Horaires"],
      path: (params) => {
        const option = params.userInput;
        if (option === "📚 Formations") return "formations";
        if (option === "🎯 Services") return "services";
        if (option === "📞 Contact") return "contact";
        if (option === "📝 Inscription") return "inscription";
        if (option === "🕒 Horaires") return "horaires";
        return "start";
      },
    },
    formations: {
      message: "Voici nos formations disponibles chez Win TO Win :",
      options: [
        "🌍 Langues Étrangères",
        "🔒 Cybersécurité",
        "📊 Power BI",
        "🤖 IA & Développement",
        "💻 Développement Web",
        "🌐 Création Sites Web",
        "🎨 Web Design",
        "🎬 Montage Vidéo",
        "🔙 Retour menu",
      ],
      path: (params) => {
        const option = params.userInput;
        if (option === "🌍 Langues Étrangères") return "formation_langues";
        if (option === "🔒 Cybersécurité") return "formation_cyber";
        if (option === "📊 Power BI") return "formation_powerbi";
        if (option === "🤖 IA & Développement") return "formation_ia";
        if (option === "💻 Développement Web") return "formation_web";
        if (option === "🌐 Création Sites Web") return "formation_sites";
        if (option === "🎨 Web Design") return "formation_design";
        if (option === "🎬 Montage Vidéo") return "formation_video";
        if (option === "🔙 Retour menu") return "start";
        return "formations";
      },
    },
    formation_langues: {
      message:
        "🌍 **Langues Étrangères**\n\n• Allemand (A1 à B2)\n• Préparation Ausbildung\n• Études et travail en Allemagne\n• Anglais et Italien disponibles\n\n💡 Formation idéale pour votre carrière internationale !",
      options: ["📞 Plus d'infos", "🔙 Autres formations", "🏠 Menu principal"],
      path: (params) => {
        const option = params.userInput;
        if (option === "📞 Plus d'infos") return "contact";
        if (option === "🔙 Autres formations") return "formations";
        if (option === "🏠 Menu principal") return "start";
        return "formation_langues";
      },
    },
    formation_cyber: {
      message:
        "🔒 **Cybersécurité**\n\n• Protection des systèmes et réseaux\n• Gestion des incidents de sécurité\n• Techniques de sécurité avancées\n• Certification professionnelle\n\n🛡️ Protégez le monde numérique !",
      options: ["📞 Plus d'infos", "🔙 Autres formations", "🏠 Menu principal"],
      path: (params) => {
        const option = params.userInput;
        if (option === "📞 Plus d'infos") return "contact";
        if (option === "🔙 Autres formations") return "formations";
        if (option === "🏠 Menu principal") return "start";
        return "formation_cyber";
      },
    },
    formation_powerbi: {
      message:
        "📊 **Power BI**\n\n• Analyse de données professionnelle\n• Reporting interactif\n• Visualisation de données\n• Tableaux de bord dynamiques\n\n📈 Transformez vos données en insights !",
      options: ["📞 Plus d'infos", "🔙 Autres formations", "🏠 Menu principal"],
      path: (params) => {
        const option = params.userInput;
        if (option === "📞 Plus d'infos") return "contact";
        if (option === "🔙 Autres formations") return "formations";
        if (option === "🏠 Menu principal") return "start";
        return "formation_powerbi";
      },
    },
    formation_ia: {
      message:
        "🤖 **IA & Développement**\n\n• Intelligence artificielle\n• Programmation avancée\n• Automatisation des processus\n• Solutions innovantes\n\n🚀 Créez l'avenir avec l'IA !",
      options: ["📞 Plus d'infos", "🔙 Autres formations", "🏠 Menu principal"],
      path: (params) => {
        const option = params.userInput;
        if (option === "📞 Plus d'infos") return "contact";
        if (option === "🔙 Autres formations") return "formations";
        if (option === "🏠 Menu principal") return "start";
        return "formation_ia";
      },
    },
    formation_web: {
      message:
        "💻 **Développement Web**\n\n• HTML, CSS, JavaScript\n• PHP, C++\n• Technologies web modernes\n• Applications robustes\n\n🌐 Construisez le web de demain !",
      options: ["📞 Plus d'infos", "🔙 Autres formations", "🏠 Menu principal"],
      path: (params) => {
        const option = params.userInput;
        if (option === "📞 Plus d'infos") return "contact";
        if (option === "🔙 Autres formations") return "formations";
        if (option === "🏠 Menu principal") return "start";
        return "formation_web";
      },
    },
    formation_sites: {
      message:
        "🌐 **Création de Sites Web**\n\n• WordPress professionnel\n• E-commerce (WooCommerce)\n• Plateformes dynamiques\n• Sites responsives\n\n🏪 Lancez votre présence en ligne !",
      options: ["📞 Plus d'infos", "🔙 Autres formations", "🏠 Menu principal"],
      path: (params) => {
        const option = params.userInput;
        if (option === "📞 Plus d'infos") return "contact";
        if (option === "🔙 Autres formations") return "formations";
        if (option === "🏠 Menu principal") return "start";
        return "formation_sites";
      },
    },
    formation_design: {
      message:
        "🎨 **Web Design & Graphisme**\n\n• UI/UX Design\n• Identité visuelle\n• Branding professionnel\n• Interfaces modernes\n\n✨ Créez des expériences visuelles exceptionnelles !",
      options: ["📞 Plus d'infos", "🔙 Autres formations", "🏠 Menu principal"],
      path: (params) => {
        const option = params.userInput;
        if (option === "📞 Plus d'infos") return "contact";
        if (option === "🔙 Autres formations") return "formations";
        if (option === "🏠 Menu principal") return "start";
        return "formation_design";
      },
    },
    formation_video: {
      message:
        "🎬 **Montage Vidéo**\n\n• Création de contenus créatifs\n• Montage professionnel\n• Post-production\n• Contenus publicitaires\n\n🎥 Racontez des histoires captivantes !",
      options: ["📞 Plus d'infos", "🔙 Autres formations", "🏠 Menu principal"],
      path: (params) => {
        const option = params.userInput;
        if (option === "📞 Plus d'infos") return "contact";
        if (option === "🔙 Autres formations") return "formations";
        if (option === "🏠 Menu principal") return "start";
        return "formation_video";
      },
    },
    services: {
      message: "🎯 **Nos Services**\n\nNous proposons des formations adaptées à différents publics :",
      options: [
        "🎓 Pour Étudiants",
        "🏢 Pour Entreprises",
        "🤝 Centres de Formation",
        "🏛️ Pour Institutions",
        "🔙 Retour menu",
      ],
      path: (params) => {
        const option = params.userInput;
        if (option === "🎓 Pour Étudiants") return "service_etudiants";
        if (option === "🏢 Pour Entreprises") return "service_entreprises";
        if (option === "🤝 Centres de Formation") return "service_centres";
        if (option === "🏛️ Pour Institutions") return "service_institutions";
        if (option === "🔙 Retour menu") return "start";
        return "services";
      },
    },
    service_etudiants: {
      message:
        "🎓 **Service Étudiants**\n\n• Formations courtes et certifiantes\n• Programmes pratiques\n• Accompagnement personnalisé\n• Préparation au marché du travail\n\n🚀 Accélérez votre carrière !",
      options: ["📞 Plus d'infos", "🔙 Autres services", "🏠 Menu principal"],
      path: (params) => {
        const option = params.userInput;
        if (option === "📞 Plus d'infos") return "contact";
        if (option === "🔙 Autres services") return "services";
        if (option === "🏠 Menu principal") return "start";
        return "service_etudiants";
      },
    },
    service_entreprises: {
      message:
        "🏢 **Service Entreprises**\n\n• Formations sur-mesure\n• Analyse des besoins\n• Formation des équipes\n• Accompagnement RH\n\n💼 Développez vos talents !",
      options: ["📞 Plus d'infos", "🔙 Autres services", "🏠 Menu principal"],
      path: (params) => {
        const option = params.userInput;
        if (option === "📞 Plus d'infos") return "contact";
        if (option === "🔙 Autres services") return "services";
        if (option === "🏠 Menu principal") return "start";
        return "service_entreprises";
      },
    },
    service_centres: {
      message:
        "🤝 **Partenariats Formation**\n\n• Collaboration avec centres\n• Enrichissement de l'offre\n• Partage d'expertise\n• Réseau de partenaires\n\n🌐 Ensemble, plus forts !",
      options: ["📞 Plus d'infos", "🔙 Autres services", "🏠 Menu principal"],
      path: (params) => {
        const option = params.userInput;
        if (option === "📞 Plus d'infos") return "contact";
        if (option === "🔙 Autres services") return "services";
        if (option === "🏠 Menu principal") return "start";
        return "service_centres";
      },
    },
    service_institutions: {
      message:
        "🏛️ **Service Institutions**\n\n• Programmes institutionnels\n• Formation secteur public\n• Organismes gouvernementaux\n• Solutions adaptées\n\n🏛️ Servir l'intérêt public !",
      options: ["📞 Plus d'infos", "🔙 Autres services", "🏠 Menu principal"],
      path: (params) => {
        const option = params.userInput;
        if (option === "📞 Plus d'infos") return "contact";
        if (option === "🔙 Autres services") return "services";
        if (option === "🏠 Menu principal") return "start";
        return "service_institutions";
      },
    },
    contact: {
      message:
        "📞 **Nos Coordonnées**\n\n📍 **Adresse :** 97 Avenue de la liberté, Tunis\n📞 **Téléphone :** +216 12 345 678\n✉️ **Email :** contact@winstowin.com\n\n🕒 **Horaires :**\n• Lun-Ven : 8h00 - 17h30\n• Sam : 8h00 - 12h00\n\n💬 N'hésitez pas à nous contacter !",
      options: ["📝 S'inscrire", "🗺️ Plan d'accès", "🏠 Menu principal"],
      path: (params) => {
        const option = params.userInput;
        if (option === "📝 S'inscrire") return "inscription";
        if (option === "🗺️ Plan d'accès") return "plan";
        if (option === "🏠 Menu principal") return "start";
        return "contact";
      },
    },
    inscription: {
      message:
        "📝 **Processus d'Inscription**\n\n1️⃣ **Consultation gratuite** - Évaluation de vos besoins\n2️⃣ **Choix de formation** - Sélection du programme\n3️⃣ **Dossier d'inscription** - Constitution du dossier\n4️⃣ **Planification** - Organisation des cours\n5️⃣ **Début de formation** - Lancement\n\n📞 Contactez-nous pour commencer !",
      options: ["📞 Nous contacter", "📚 Voir formations", "🏠 Menu principal"],
      path: (params) => {
        const option = params.userInput;
        if (option === "📞 Nous contacter") return "contact";
        if (option === "📚 Voir formations") return "formations";
        if (option === "🏠 Menu principal") return "start";
        return "inscription";
      },
    },
    horaires: {
      message:
        "🕒 **Nos Horaires d'Ouverture**\n\n📅 **Lundi - Vendredi :** 8h00 - 17h30\n📅 **Samedi :** 8h00 - 12h00\n📅 **Dimanche :** Fermé\n\n💡 Vous pouvez nous contacter pendant ces heures ou laisser un message !",
      options: ["📞 Nous contacter", "📍 Notre adresse", "🏠 Menu principal"],
      path: (params) => {
        const option = params.userInput;
        if (option === "📞 Nous contacter") return "contact";
        if (option === "📍 Notre adresse") return "plan";
        if (option === "🏠 Menu principal") return "start";
        return "horaires";
      },
    },
    plan: {
      message:
        "🗺️ **Plan d'Accès**\n\n📍 **Adresse complète :**\n97 Avenue de la liberté\nTunis, Tunisie\n\n🚗 **Parking disponible**\n🚌 **Accessible en transport**\n🚇 **Proche métro/bus**\n\n💡 Utilisez GPS ou Google Maps pour nous trouver facilement !",
      options: ["📞 Nous contacter", "🕒 Nos horaires", "🏠 Menu principal"],
      path: (params) => {
        const option = params.userInput;
        if (option === "📞 Nous contacter") return "contact";
        if (option === "🕒 Nos horaires") return "horaires";
        if (option === "🏠 Menu principal") return "start";
        return "plan";
      },
    },
  };

  const settings = {
    general: {
      primaryColor: "#00a0e8",
      secondaryColor: "#0080c7",
      fontFamily: "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      embedded: false,
    },
    tooltip: {
      mode: "NEVER" ,
    },
    chatButton: {
      icon: ChatIcon,
    },
    header: {
      title: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "18px", fontWeight: "600" }}>Win TO Win Assistant</span>
        </div>
      ),
      showAvatar: false,
      closeChatIcon: CloseIcon,
    },
    chatInput: {
      enabledPlaceholderText: "Tapez votre message...",
      disabledPlaceholderText: "Sélectionnez une option ci-dessus",
      showCharacterCount: false,
      blockSpam: true,
      disabled: false,
      sendButtonIcon: SendIcon,
    },
    chatWindow: {
      showScrollbar: true,
      autoJumpToBottom: true,
      showMessagePrompt: true,
      messagePromptText: "Nouveau message ↓",
      defaultOpen: false,
    },
    botBubble: {
      showAvatar: false,
      simStream: true,
      streamSpeed: 30,
      dangerouslySetInnerHtml: true,
    },
    userBubble: {
      showAvatar: false,
    },
    notification: {
      disabled: false,
      defaultToggledOn: false,
      showCount: false,
    },
    audio: {
      disabled: true,
    },
    voice: {
      disabled: true,
    },
    footer: {
      text: (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
          <span>Powered by</span>
          <span style={{ fontWeight: "600", color: "#00a0e8" }}>Win TO Win</span>
        </div>
      ),
    },
  };

  const styles = {
    chatButtonStyle: {
      background: "linear-gradient(135deg, #00a0e8 0%, #0080c7 100%)",
      width: "70px",
      height: "70px",
      border: "3px solid #ffffff",
      borderRadius: "50%",
      boxShadow: "0 8px 24px rgba(0, 160, 232, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      position: "fixed" ,
      bottom: "20px",
      right: "20px",
      zIndex: 9999,
      fontSize: "32px",
      fontWeight: "bold",
      color: "#ffffff",
    },
    chatButtonHoveredStyle: {
      background: "linear-gradient(135deg, #0080c7 0%, #006ba3 100%)",
      transform: "scale(1.1)",
      boxShadow: "0 12px 32px rgba(0, 160, 232, 0.5), 0 6px 16px rgba(0, 0, 0, 0.2)",
      borderColor: "#ffffff",
    },
    chatWindowStyle: {
      backgroundColor: "#ffffff",
      border: "none",
      borderRadius: "20px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)",
      fontFamily: "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      width: "350px",
      height: "500px",
      overflow: "hidden",
    },
    headerStyle: {
      background: "linear-gradient(135deg, #00a0e8 0%, #0080c7 50%, #006ba3 100%)",
      color: "#ffffff",
      borderRadius: "20px 20px 0 0",
      padding: "18px 20px",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "relative" ,
    },
    closeChatIconStyle: {
      color: "#ffffff",
      cursor: "pointer",
      padding: "8px",
      borderRadius: "10px",
      transition: "all 0.25s ease",
      backgroundColor: "rgba(255, 255, 255, 0.12)",
      borderWidth: "1.5px",
      borderStyle: "solid",
      borderColor: "rgba(255, 255, 255, 0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(10px)",
      fontSize: "18px",
      fontWeight: "bold",
    },
    closeChatIconHoveredStyle: {
      backgroundColor: "rgba(255, 255, 255, 0.22)",
      transform: "rotate(90deg) scale(1.05)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
    },
    bodyStyle: {
      backgroundColor: "#f8fafc",
      padding: "18px",
      backgroundImage: `
        radial-gradient(circle at 15% 25%, rgba(0, 160, 232, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 85% 75%, rgba(0, 128, 199, 0.05) 0%, transparent 50%),
        linear-gradient(to bottom, rgba(0, 160, 232, 0.02) 0%, transparent 100%)
      `,
    },
    chatInputContainerStyle: {
      padding: "16px 18px",
      backgroundColor: "#ffffff",
      borderRadius: "0 0 20px 20px",
      borderTop: "1px solid #e5e7eb",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    chatInputAreaStyle: {
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "#e5e7eb",
      borderRadius: "14px",
      padding: "11px 15px",
      fontSize: "14px",
      fontFamily: "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      resize: "none" ,
      outline: "none",
      transition: "all 0.2s",
      backgroundColor: "#ffffff",
      color: "#1f2937",
      flex: 1,
    },
    chatInputAreaFocusedStyle: {
      borderColor: "#00a0e8",
      boxShadow: "0 0 0 3px rgba(0, 160, 232, 0.1)",
    },
    sendButtonStyle: {
      background: "#00a0e8",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "#00a0e8",
      borderRadius: "50%",
      color: "#ffffff",
      width: "44px",
      height: "44px",
      cursor: "pointer",
      transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 8px rgba(0, 160, 232, 0.2)",
      flexShrink: 0,
      fontSize: "20px",
      fontWeight: "bold",
    },
    sendButtonHoveredStyle: {
      background: "#0080c7",
      borderColor: "#0080c7",
      color: "#ffffff",
      transform: "scale(1.05)",
      boxShadow: "0 4px 12px rgba(0, 160, 232, 0.3)",
    },
    botBubbleStyle: {
      background: "linear-gradient(135deg, #00a0e8 0%, #0080c7 100%)",
      color: "#ffffff !important",
      borderRadius: "16px 16px 16px 4px",
      padding: "13px 17px",
      marginBottom: "10px",
      maxWidth: "80%",
      fontSize: "14px",
      lineHeight: "1.6",
      boxShadow: "0 3px 12px rgba(0, 160, 232, 0.2)",
      whiteSpace: "pre-wrap" ,
      fontFamily: "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    userBubbleStyle: {
      background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
      color: "#1f2937",
      borderRadius: "16px 16px 4px 16px",
      padding: "13px 17px",
      marginBottom: "10px",
      maxWidth: "80%",
      fontSize: "14px",
      lineHeight: "1.6",
      marginLeft: "auto",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
    },
    botOptionsContainerStyle: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "8px",
      marginTop: "12px",
      marginBottom: "10px",
    },
    botOptionStyle: {
      backgroundColor: "#ffffff",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "#e5e7eb",
      borderRadius: "12px",
      padding: "10px 12px",
      margin: "0",
      color: "#1f2937",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "500",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center" ,
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
      minHeight: "44px",
      lineHeight: "1.3",
      overflow: "visible",
      whiteSpace: "normal" ,
      fontFamily: "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    botOptionHoveredStyle: {
      background: "linear-gradient(135deg, #00a0e8 0%, #0080c7 100%)",
      color: "#ffffff",
      transform: "translateY(-2px) scale(1.02)",
      boxShadow: "0 6px 18px rgba(0, 160, 232, 0.3)",
      borderColor: "#00a0e8",
    },
    footerStyle: {
      padding: "12px",
      fontSize: "11px",
      color: "#9ca3af",
      textAlign: "center" ,
      borderTop: "1px solid #e5e7eb",
      background: "linear-gradient(to top, #f9fafb 0%, #ffffff 100%)",
    },
    scrollbarStyle: {
      width: "6px",
    },
    scrollbarThumbStyle: {
      background: "linear-gradient(135deg, #00a0e8 0%, #0080c7 100%)",
      borderRadius: "3px",
    },
  };

  return <ChatBot settings={settings} styles={styles} flow={flow} />;
};

export default Win2WinChatBot;
