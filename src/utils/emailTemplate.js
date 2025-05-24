// Plantilla para enviar la url con el enlace de verificación
export const Url_Verification_Template = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verificación de cuenta | LAPSI</title>
      <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
          
          body {
              font-family: 'Roboto', Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background-color: #f5f7f9;
              color: #333333;
              line-height: 1.6;
          }
          
          .email-wrapper {
              width: 100%;
              max-width: none;
              background-color: #f5f7f9;
          }
          
          .container {
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 12px;
              box-shadow: 0 5px 20px rgba(21, 46, 58, 0.12);
              overflow: hidden;
          }
          
          .header {
              background-color: #152E3A;
              color: white;
              padding: 40px 30px;
              text-align: center;
              font-size: 28px;
              font-weight: 600;
              border-bottom: 5px solid #2a5769;
          }
          
          .logo {
              margin-bottom: 15px;
              max-width: 200px;
          }
          
          .content {
              padding: 50px 40px;
              color: #444;
              line-height: 1.8;
              max-width: 100%;
          }
          
          .salutation {
              font-size: 20px;
              font-weight: 500;
              color: #152E3A;
              margin-bottom: 25px;
          }
          
          .message {
              font-size: 17px;
              margin-bottom: 30px;
              text-align: justify;
          }
          
          .verification-code {
              display: block;
              margin: 40px auto;
              font-size: 32px;
              color: #152E3A;
              background: rgba(21, 46, 58, 0.08);
              border: 2px dashed #152E3A;
              padding: 20px 30px;
              text-align: center;
              border-radius: 10px;
              font-weight: 700;
              letter-spacing: 5px;
              width: fit-content;
              min-width: 300px;
              word-break: break-all;
              word-wrap: break-word;
          }
          
          .note {
              font-size: 15px;
              color: #666;
              margin-top: 30px;
              padding-top: 25px;
              border-top: 1px solid #eee;
              text-align: justify;
          }
          
          .footer {
              background-color: #f0f3f5;
              padding: 30px 40px;
              text-align: center;
              color: #555;
              font-size: 14px;
              border-top: 1px solid #e1e5e8;
          }
          
          .social-links {
              margin: 20px 0;
          }
          
          .social-icon {
              display: inline-block;
              margin: 0 10px;
              width: 35px;
              height: 35px;
              background-color: #152E3A;
              border-radius: 50%;
              text-align: center;
              line-height: 35px;
          }
          
          .social-icon img {
              vertical-align: middle;
              width: 18px;
              height: 18px;
          }
          
          .separator {
              height: 1px;
              background-color: #e1e5e8;
              margin: 20px 0;
          }
          
          .copyright {
              font-size: 13px;
              color: #777;
              line-height: 1.5;
          }
          
          /* Estilos para tablets */
          @media only screen and (max-width: 768px) {
              body {
                  padding: 15px;
              }
              
              .container {
                  max-width: 100%;
                  border-radius: 8px;
              }
              
              .header {
                  padding: 30px 25px;
                  font-size: 24px;
              }
              
              .content {
                  padding: 40px 30px;
              }
              
              .salutation {
                  font-size: 18px;
              }
              
              .message {
                  font-size: 16px;
              }
              
              .verification-code {
                  font-size: 28px;
                  padding: 18px 25px;
                  min-width: 250px;
                  letter-spacing: 4px;
              }
              
              .footer {
                  padding: 25px 30px;
              }
          }
          
          /* Estilos para móviles */
          @media only screen and (max-width: 480px) {
              body {
                  padding: 10px;
              }
              
              .container {
                  border-radius: 0;
                  margin: 0;
              }
              
              .header {
                  padding: 25px 20px;
                  font-size: 22px;
              }
              
              .content {
                  padding: 30px 20px;
              }
              
              .salutation {
                  font-size: 17px;
                  margin-bottom: 20px;
              }
              
              .message {
                  font-size: 15px;
                  margin-bottom: 25px;
              }
              
              .verification-code {
                  font-size: 24px;
                  padding: 15px 20px;
                  margin: 30px auto;
                  min-width: 200px;
                  letter-spacing: 3px;
                  word-break: break-all;
              }
              
              .note {
                  font-size: 14px;
                  margin-top: 25px;
                  padding-top: 20px;
              }
              
              .footer {
                  padding: 20px 15px;
                  font-size: 13px;
              }
              
              .social-icon {
                  width: 30px;
                  height: 30px;
                  line-height: 30px;
                  margin: 0 6px;
              }
              
              .social-icon img {
                  width: 16px;
                  height: 16px;
              }
              
              .copyright {
                  font-size: 12px;
              }
          }
          
          /* Estilos específicos para clientes de email */
          @media screen and (min-width: 600px) {
              .container {
                  width: 800px !important;
              }
          }
          
          /* Fix para Outlook */
          .outlook-fix {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-collapse: collapse;
              border-spacing: 0;
          }
      </style>
      <!--[if mso]>
      <style>
          .container {
              width: 800px !important;
          }
      </style>
      <![endif]-->
  </head>
  <body>
      <div class="email-wrapper">
          <div class="container outlook-fix">
              <div class="header">
                  <div>{cabecera}</div>
              </div>
              <div class="content">
                  <div class="salutation">Estimado/a profesional,</div>
                  <div class="message">
                      Gracias por unirse a LAPSI, su plataforma especializada para profesionales de la salud mental. Para garantizar la seguridad de su cuenta, por favor verifique su cuenta abriendo el sigueinte link de verificación en la plataforma:
                  </div>
                  <div class="verification-code">{verificationCode}</div>
                  <div class="message">
                      Este código es de un solo uso y expirará después de 25 minutos. Una vez verificada su cuenta, tendrá acceso completo a todas las herramientas y recursos diseñados específicamente para apoyar su práctica profesional.
                  </div>
                  <div class="note">
                      Si no ha solicitado esta verificación o necesita asistencia, por favor contáctenos inmediatamente a través de soporte@lapsi.com.
                  </div>
              </div>
              <div class="footer">
                  <div>LAPSI - Plataforma para profesionales de la salud mental</div>
                  <div class="separator"></div>
                  <div class="copyright">&copy; ${new Date().getFullYear()} LAPSI | Lapsi.cecar.edu.co | Desarrollado por ALBO DEV</div>
              </div>
          </div>
      </div>
  </body>
  </html>
`;

// Plantilla para enviar el correo de bienvenida
export const Welcome_Template = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bienvenido a LAPSI | Plataforma para profesionales de la salud mental</title>
      <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
          
          body {
              font-family: 'Roboto', Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f7f9;
              color: #333333;
              line-height: 1.6;
          }
          
          .container {
              max-width: 600px;
              margin: 40px auto;
              background: #ffffff;
              border-radius: 12px;
              box-shadow: 0 5px 20px rgba(21, 46, 58, 0.12);
              overflow: hidden;
          }
          
          .header {
              background-color: #152E3A;
              color: white;
              padding: 30px 20px;
              text-align: center;
              font-size: 26px;
              font-weight: 600;
              border-bottom: 5px solid #2a5769;
          }
          
          .logo-container {
              margin-bottom: 15px;
          }
          
          .content {
              padding: 35px 30px;
              color: #444;
              line-height: 1.8;
          }
          
          .salutation {
              font-size: 20px;
              font-weight: 500;
              color: #152E3A;
              margin-bottom: 20px;
          }
          
          .welcome-message {
              font-size: 17px;
              margin-bottom: 25px;
          }
          
          .feature-list {
              background-color: rgba(21, 46, 58, 0.05);
              padding: 20px 25px;
              border-radius: 8px;
              margin: 25px 0;
          }
          
          .feature-list h3 {
              margin-top: 0;
              color: #152E3A;
              font-size: 18px;
              font-weight: 500;
          }
          
          .feature-list ul {
              padding-left: 20px;
              margin-bottom: 5px;
          }
          
          .feature-list li {
              margin-bottom: 12px;
              position: relative;
          }
          
          .button-container {
              text-align: center;
              margin: 30px 0;
          }
          
          .button {
              display: inline-block;
              padding: 14px 30px;
              background-color: #152E3A;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-size: 16px;
              font-weight: 500;
              transition: all 0.3s ease;
              box-shadow: 0 4px 6px rgba(21, 46, 58, 0.12);
          }
          
          .button:hover {
              background-color: #1e3f4e;
              transform: translateY(-2px);
              box-shadow: 0 6px 8px rgba(21, 46, 58, 0.15);
          }
          
          .support-section {
              border-top: 1px solid #eee;
              padding-top: 20px;
              margin-top: 25px;
              font-size: 15px;
          }
          
          .support-section p {
              margin-bottom: 10px;
          }
          
          .contact-email {
              color: #152E3A;
              font-weight: 500;
              text-decoration: none;
          }
          
          .footer {
              background-color: #f0f3f5;
              padding: 20px;
              text-align: center;
              color: #555;
              font-size: 13px;
              border-top: 1px solid #e1e5e8;
          }
          
          .social-links {
              margin: 15px 0;
          }
          
          .separator {
              height: 1px;
              background-color: #e1e5e8;
              margin: 15px 0;
          }
          
          .copyright {
              font-size: 12px;
              color: #777;
          }
          
          @media only screen and (max-width: 620px) {
              .container {
                  width: 100%;
                  margin: 20px auto;
                  border-radius: 0;
              }
              
              .content {
                  padding: 25px 20px;
              }
              
              .button {
                  display: block;
                  text-align: center;
              }
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <div class="logo-container">
                  <!-- Si dispones de un logo, aquí iría la imagen -->
              </div>
              <div>Bienvenido/a a LAPSI</div>
          </div>
          <div class="content">
              <div class="salutation">Estimado/a {name} {lastname},</div>
              
              <div class="welcome-message">
                  Le damos la más cordial bienvenida a LAPSI, su nueva plataforma especializada para profesionales de la salud mental y agendamiento de citas. Nos complace confirmar que su registro se ha completado exitosamente.
              </div>
              
              <div class="feature-list">
                  <h3>Para comenzar a aprovechar todas las funcionalidades:</h3>
                  <ul>
                      <li><strong>Agende citas de forma flexible</strong> – Reserve una cita para usted y agregue compañeros que asistirán con usted, todo desde una sola interfaz.</li>
                      <li><strong>Gestione cupos en tiempo real</strong> – Visualice la disponibilidad actualizada al instante y evite sobrecupo en los laboratorios.</li>
                      <li><strong>Configure su agenda</strong> – Defina sus horarios de disponibilidad y solicite una reserva en LAPSI.</li>
                      <li><strong>Consulte su historial de reservas</strong> – Revise fácilmente todas sus reservas anteriores, incluyendo fechas, asistentes y detalles relevantes de cada sesión.</li>
                 </ul>
              </div>
              
              <div class="button-container">
                  <a href="http://lapsi.cecar.edu.co/login" class="button">Acceder a mi cuenta</a>
              </div>
              
              <div class="support-section">
                  <p>Su desarrollo profesional es nuestra prioridad. Si tiene alguna consulta o necesita asistencia, nuestro equipo especializado está disponible para ayudarle:</p>
                  <p>✉️ <a href="mailto:soporte@lapsi.com" class="contact-email">soporte@lapsi.com</a></p>
                  <p>📞 Línea de atención: +57 (XXX) XXX-XXXX</p>
              </div>
          </div>
          <div class="footer">
              <div>LAPSI - Plataforma para profesionales de la salud mental</div>
              <div class="separator"></div>
              <div class="copyright">&copy; ${new Date().getFullYear()} LAPSI | Lapsi.cecar.edu.co | Desarrollado por ALBO DEV</div>
          </div>
      </div>
  </body>
  </html>
`;

//Plantilla para enviar la URL de restablecimiento de la contraseña
export const Url_Template = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Restablecimiento de Contraseña | LAPSI</title>
      <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
          
          body {
              font-family: 'Roboto', Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f7f9;
              color: #333333;
              line-height: 1.6;
          }
          
          .container {
              max-width: 600px;
              margin: 40px auto;
              background: #ffffff;
              border-radius: 12px;
              box-shadow: 0 5px 20px rgba(21, 46, 58, 0.12);
              overflow: hidden;
          }
          
          .header {
              background-color: #152E3A;
              color: white;
              padding: 30px 20px;
              text-align: center;
              font-size: 24px;
              font-weight: 600;
              border-bottom: 5px solid #2a5769;
          }
          
          .content {
              padding: 35px 30px;
              color: #444;
              line-height: 1.8;
          }
          
          .salutation {
              font-size: 18px;
              font-weight: 500;
              color: #152E3A;
              margin-bottom: 20px;
          }
          
          .message {
              font-size: 16px;
              margin-bottom: 25px;
          }
          
          .button-container {
              margin: 35px auto;
              text-align: center;
          }
          
          .recovery-button {
              display: inline-block;
              padding: 14px 30px;
              background-color: #152E3A;
              color: white !important;
              text-decoration: none;
              border-radius: 6px;
              font-size: 16px;
              font-weight: 500;
              transition: all 0.3s ease;
              box-shadow: 0 4px 6px rgba(21, 46, 58, 0.12);
          }
          
          .recovery-button:hover {
              background-color: #1e3f4e;
              transform: translateY(-2px);
              box-shadow: 0 6px 8px rgba(21, 46, 58, 0.15);
          }
          
          .security-notice {
              margin-top: 30px;
              padding: 15px;
              background-color: rgba(21, 46, 58, 0.05);
              border-left: 4px solid #152E3A;
              border-radius: 4px;
              font-size: 14px;
          }
          
          .security-notice p {
              margin: 0 0 10px;
          }
          
          .security-notice p:last-child {
              margin-bottom: 0;
          }
          
          .support-section {
              margin-top: 30px;
              font-size: 15px;
              border-top: 1px solid #eee;
              padding-top: 20px;
          }
          
          .footer {
              background-color: #f0f3f5;
              padding: 20px;
              text-align: center;
              color: #555;
              font-size: 13px;
              border-top: 1px solid #e1e5e8;
          }
          
          .separator {
              height: 1px;
              background-color: #e1e5e8;
              margin: 15px 0;
          }
          
          .copyright {
              font-size: 12px;
              color: #777;
          }
          
          .alternative-text {
              display: block;
              margin: 15px 0;
              font-size: 14px;
              color: #666;
          }
          
          .link-url {
              word-break: break-all;
              color: #152E3A;
              font-weight: 500;
          }
          
          @media only screen and (max-width: 620px) {
              .container {
                  width: 100%;
                  margin: 20px auto;
                  border-radius: 0;
              }
              
              .content {
                  padding: 25px 20px;
              }
              
              .recovery-button {
                  display: block;
                  text-align: center;
              }
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">{cabecera}</div>
          <div class="content">
              <div class="salutation">Estimado/a profesional,</div>
              
              <div class="message">
                  Hemos recibido una solicitud para restablecer la contraseña de su cuenta en la plataforma LAPSI. Para crear una nueva contraseña de forma segura, por favor haga clic en el siguiente botón:
              </div>
              
              <div class="button-container">
                  <a href="{urlCode}" class="recovery-button">Restablecer mi contraseña</a>
              </div>
              
              <div class="alternative-text">
                  Si el botón no funciona, puede copiar y pegar el siguiente enlace en su navegador:
                  <a href="{urlCode}" class="link-url">{urlCode}</a>
              </div>
              
              <div class="security-notice">
                  <p><strong>Aviso de seguridad:</strong></p>
                  <p>• Este enlace caducará en 25 minutos por motivos de seguridad.</p>
                  <p>• Si no ha solicitado restablecer su contraseña, le recomendamos contactar inmediatamente con nuestro equipo de soporte, ya que alguien podría estar intentando acceder a su cuenta.</p>
                  <p>• Por su seguridad, nunca compartimos sus credenciales por correo electrónico ni le solicitamos información personal adicional.</p>
              </div>
              
              <div class="support-section">
                  <p>Si necesita asistencia adicional, nuestro equipo de soporte está disponible en:</p>
                  <p>✉️ <a href="mailto:soporte@lapsi.com" style="color: #152E3A; font-weight: 500; text-decoration: none;">soporte@lapsi.com</a></p>
                  <p>📞 Línea de atención: +57 (XXX) XXX-XXXX</p>
              </div>
          </div>
          <div class="footer">
              <div>LAPSI - Plataforma para profesionales de la salud mental</div>
              <div class="separator"></div>
              <div class="copyright">&copy; ${new Date().getFullYear()} LAPSI | Lapsi.cecar.edu.co | Desarrollado por ALBO DEV</div>
          </div>
      </div>
  </body>
  </html>
`;
