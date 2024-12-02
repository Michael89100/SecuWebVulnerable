<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section about">
          <h3>À propos</h3>
          <p>Notre plateforme offre un environnement de mentorat où vous pouvez apprendre et grandir avec l'aide d'experts dans divers domaines.</p>
        </div>
        <div class="footer-section links">
          <h3>Liens utiles</h3>
          <ul>
            <li><a href="#"><i class="pi pi-home"></i> Accueil</a></li>
            <li><a href="#"><i class="pi pi-info-circle"></i> À propos</a></li>
            <li><a href="#"><i class="pi pi-users"></i> Mentors</a></li>
            <li><a href="#"><i class="pi pi-envelope"></i> Contact</a></li>
          </ul>
        </div>
        <div class="footer-section contact">
          <h3>Contactez-nous</h3>
          <p><i class="pi pi-envelope"></i> Email: contact@mentorat.com</p>
          <p><i class="pi pi-phone"></i> Téléphone: 01 23 45 67 89</p>
        </div>
        <div class="footer-section social">
          <h3>Suivez-nous</h3>
          <a href="#"><i class="pi pi-facebook"></i></a>
          <a href="#"><i class="pi pi-twitter"></i></a>
          <a href="#"><i class="pi pi-linkedin"></i></a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Mentor Platform. Tous droits réservés.</p>
      </div>
    </footer>
  </template>
  
  <style scoped>
  .footer {
    background-color: #333;
    color: white;
    padding: 30px 0;
    text-align: center;
  }
  
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-section {
    flex: 1;
    min-width: 200px;
    padding: 10px;
  }
  
  .footer-section h3 {
    font-size: 1.2em;
    margin-bottom: 10px;
    font-weight: 500;
  }
  
  .footer-section p, .footer-section ul {
    font-size: 0.9em;
    color: #ccc;
    line-height: 1.4;
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-section ul li {
    margin-bottom: 5px;
  }
  
  .footer-section ul li a {
    color: #42a5f5;
    text-decoration: none;
  }
  
  .footer-section ul li a:hover {
    text-decoration: underline;
  }
  
  .footer-section a {
    color: #42a5f5;
    text-decoration: none;
    margin: 0 5px;
  }
  
  .footer-section a:hover {
    text-decoration: underline;
  }
  
  .footer-bottom {
    background-color: #222;
    color: #ccc;
    padding: 10px 0;
    margin-top: 10px;
  }
  
  .footer-bottom p {
    margin: 0;
    font-size: 0.8em;
  }
  </style>
