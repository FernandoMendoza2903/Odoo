// ==UserScript==
// @name         Zienen Mail Hub - Con Pestaña Retráctil
// @namespace    http://tampermonkey.net/
// @version      10.0
// @description  Hub de correos con pestaña lateral para ocultar/mostrar
// @author       Gemini
// @match        *://*.zienen.com/*
// @match        *://www.zienen.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // BASE DE DATOS DE PLANTILLAS (CÓDIGO COMPLETO SIN OMISIONES)
    const plantillas = [
        {
            nombre: "Cliente Actual (No tradicional)",
            asunto: "[Nombre], ¿sabías que ya no somos un proveedor tradicional?",
            html: `<div style="background-color: #f4f4f7; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif; color: #333333;"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #dddddd; border-collapse: collapse; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);"><tr><td style="padding: 15px 40px; background-color: #f97316;"></td></tr><tr><td style="padding: 40px;"><p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Hola, <strong>[Nombre]</strong>:</p><p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #444444;">Como sabes, somos proveedores de <strong>[Nombre de su empresa/planta]</strong>. Hemos tenido el gusto de apoyarte anteriormente, pero hoy queremos que dejes de vernos como un proveedor más y nos utilices como tu <strong>ventaja competitiva estratégica</strong>.</p><div style="color: #f97316; font-weight: 800; font-size: 22px; line-height: 1.2; margin: 30px 0; font-family: Arial, sans-serif;">¿SABÍAS QUE YA NO SOMOS UN PROVEEDOR TRADICIONAL?</div><p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #444444;">A diferencia de quienes improvisan "cotizando todo", nosotros somos un <strong>Hub Digital</strong> que te conecta directamente con las marcas líderes en EPP, Ferretería, Herramientas y Suministros Industriales. Para que conozcas a detalle este nuevo modelo, te adjunto una breve presentación de quiénes somos y cómo estamos transformando el suministro industrial.</p><div style="background-color: #fffaf5; border-left: 5px solid #f97316; padding: 20px; margin: 30px 0; border-radius: 4px;"><p style="margin: 0 0 12px 0; font-size: 15px; color: #1a1a1a;">⚡ <strong>Entregas:</strong> Desde 24h directo de marca o nuestro CEDIS.</p><p style="margin: 0 0 12px 0; font-size: 15px; color: #1a1a1a;">📊 <strong>Autonomía Digital:</strong> Precios especiales y stock en tiempo real.</p><p style="margin: 0; font-size: 15px; color: #1a1a1a;">🛠️ <strong>Soporte en Sitio:</strong> Un especialista técnico te acompaña en cada decisión.</p></div><p style="font-size: 17px; line-height: 1.6; margin-bottom: 25px; color: #1a1a1a;"><strong>Solo necesito 15 minutos de tu tiempo.</strong> Me gustaría visitarte <strong>pronto</strong> para mostrarte cómo este modelo híbrido te dará el control que hoy falta en tu operación.</p><div style="text-align: center; padding: 10px 0;"><a href="https://www.zienen.com/citas" style="background-color: #f97316; color: #ffffff; text-decoration: none; padding: 16px 30px; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px; box-shadow: 0 4px 6px rgba(249, 115, 22, 0.2);">📅 Agendar mis 15 minutos</a><p style="margin-top: 20px;"><a href="https://www.zienen.com/shop" style="color: #f97316; text-decoration: underline; font-weight: bold; font-size: 14px;">Ház tu primer busqueda en zienen.com →</a></p></div><p style="font-size: 13px; color: #999999; border-top: 1px solid #eeeeee; margin-top: 40px; padding-top: 25px; text-align: center; line-height: 1.5;">Saludos,<br><strong>Equipo ZIENEN México</strong><br><span style="font-size: 12px; color: #f97316; font-weight: bold;">Hub Digital de Suministro Industrial</span></p></td></tr></table></div>`
        },
        {
            nombre: "Lead Nuevo (Hub Digital)",
            asunto: "[Nombre], el suministro en [Nombre de su empresa] ya no tiene que ser tradicional.",
            html: `<div style="background-color: #f4f4f7; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif; color: #333333;"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #dddddd; border-collapse: collapse; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);"><tr><td style="padding: 15px 40px; background-color: #f97316;"></td></tr><tr><td style="padding: 40px;"><p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Hola, <strong>[Nombre]</strong>:</p><p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #444444;">Me pongo en contacto contigo porque sabemos que en <strong>[Nombre de su empresa]</strong> la eficiencia operativa es clave. Hoy no quiero presentarte a un proveedor más, sino ofrecerte una <strong>ventaja competitiva</strong> para tu gestión de suministros.</p><div style="color: #f97316; font-weight: 800; font-size: 20px; line-height: 1.3; margin: 30px 0; font-family: Arial, sans-serif; text-transform: uppercase;">¿SABÍAS QUE EL SUMINISTRO YA NO TIENE QUE SER TRADICIONAL?</div><p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #444444;">A diferencia de quienes improvisan sin stock real, en <strong>ZIENEN</strong> operamos como un <strong>Hub Digital</strong>. Te conectamos directamente con las marcas líderes en EPP, Ferretería, Herramientas y Suministros Industriales para que decidas basándote en datos reales. Te adjunto nuestra presentación de marca para que puedas echar un vistazo a cómo estamos digitalizando el sector.</p><div style="background-color: #fcfcfd; border: 1px solid #eef0f2; padding: 25px; margin: 30px 0; border-radius: 8px;"><p style="margin: 0 0 15px 0; font-size: 15px;">⚡ <strong>Certidumbre Logística:</strong> Entregas desde 24hrs directo de marca o CEDIS.</p><p style="margin: 0 0 15px 0; font-size: 15px;">📊 <strong>Control Total:</strong> Precios especiales y existencias en tiempo real.</p><p style="margin: 0; font-size: 15px;">🤝 <strong>Respaldo Humano:</strong> Especialista técnico en sitio para levantamientos.</p></div><p style="font-size: 17px; line-height: 1.6; margin-bottom: 25px; color: #1a1a1a;">Queremos visitarte para mostrarte cómo este modelo híbrido te dará la certidumbre que hoy te hace falta. <strong>¿Te queda bien pronto para una breve sesión de 15 minutos en tu oficina?</strong></p><div style="text-align: center; padding: 10px 0;"><a href="https://www.zienen.com/citas" style="background-color: #f97316; color: #ffffff; text-decoration: none; padding: 16px 30px; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px; box-shadow: 0 4px 10px rgba(249, 115, 22, 0.3);">📅 Agendar visita y demo</a><p style="margin-top: 25px; font-size: 14px; color: #666666;">O ponnos a prueba buscando ahora en:<br><a href="https://www.zienen.com/shop" style="color: #f97316; text-decoration: underline; font-weight: bold; font-size: 16px; display: inline-block; margin-top: 5px;">zienen.com →</a></p></div><p style="font-size: 12px; color: #999999; border-top: 1px solid #eeeeee; margin-top: 40px; padding-top: 25px; text-align: center; line-height: 1.6;">Saludos,<br><strong>Equipo ZIENEN México</strong><br><span style="color: #f97316; font-weight: bold;">Digitalizando el Suministro Industrial</span></p></td></tr></table></div>`
        },
        {
            nombre: "Seguimiento Cliente Actual",
            asunto: "[Nombre], eliminemos la espera de \"ver si se consigue\"",
            html: `<div style="background-color: #f4f4f7; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif; color: #333333;"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #dddddd; border-collapse: collapse; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);"><tr><td style="padding: 15px 40px; background-color: #575b63;"><p style="margin: 0; color: #ffffff; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 1.2px;">Seguimiento • Suministro Inteligente</p></td></tr><tr><td style="padding: 40px;"><p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Hola, <strong>[Nombre]</strong>:</p><p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #444444;">Te escribí hace unos días sobre cómo estamos transformando el suministro en <strong>[Nombre de su empresa]</strong>, pero entiendo perfectamente que el día a día en planta es acelerado.</p><div style="color: #f97316; font-weight: 800; font-size: 20px; line-height: 1.3; margin: 30px 0; font-family: Arial, sans-serif; text-transform: uppercase;">IMPULSA LA PRODUCTIVIDAD DE TU PLANTA CON SUMINISTRO INTELIGENTE</div><p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #444444;">El beneficio más directo de usar nuestro Hub es la <strong>claridad</strong>. En ZIENEN visualizas disponibilidad real y tiempos de respuesta inmediatos para que tu operación nunca se detenga:</p><div style="background-color: #ffffff; border: 2px solid #f97316; padding: 25px; margin: 30px 0; border-radius: 12px; text-align: center;"><p style="margin: 0 0 15px 0; font-size: 18px; color: #1a1a1a;">🚚 <strong>Entregas: Desde 24hrs</strong></p><div style="display: block; margin-top: 10px;"><span style="display: inline-block; background-color: #f4f4f7; color: #575b63; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin: 4px; border: 1px solid #ddd;">🛡️ EPP</span><span style="display: inline-block; background-color: #f4f4f7; color: #575b63; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin: 4px; border: 1px solid #ddd;">🔧 HERRAMIENTA</span><span style="display: inline-block; background-color: #f4f4f7; color: #575b63; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin: 4px; border: 1px solid #ddd;">⛓️ FERRETERÍA</span><span style="display: inline-block; background-color: #f4f4f7; color: #575b63; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin: 4px; border: 1px solid #ddd;">🏭 SUMINISTROS INDUSTRIALES</span></div></div><p style="font-size: 17px; line-height: 1.6; margin-bottom: 25px; color: #1a1a1a;">Me gustaría pasar a saludarte <strong>pronto</strong> para dejar configurado tu panel y que tu equipo opere con datos en tiempo real. <strong>Solo nos tomará 15 minutos.</strong></p><div style="text-align: center; padding: 10px 0;"><a href="https://www.zienen.com/citas" style="background-color: #f97316; color: #ffffff; text-decoration: none; padding: 16px 30px; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px; box-shadow: 0 4px 10px rgba(249, 115, 22, 0.3);">🚀 Confirmar visita rápida</a></div><p style="font-size: 12px; color: #999999; border-top: 1px solid #eeeeee; margin-top: 40px; padding-top: 25px; text-align: center; line-height: 1.6;">Saludos,<br><strong>Equipo ZIENEN México</strong></p></td></tr></table></div>`
        },
        {
            nombre: "Seguimiento Lead (Costo Improvisación)",
            asunto: "[Nombre], entregas desde 24h con datos reales (No es promesa, es el Hub)",
            html: `<div style="background-color: #f4f4f7; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif; color: #333333;"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #dddddd; border-collapse: collapse; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);"><tr><td style="padding: 15px 40px; background-color: #1a1b21;"><p style="margin: 0; color: #ffffff; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 1.2px;">Análisis de Eficiencia • ZIENEN.COM</p></td></tr><tr><td style="padding: 40px;"><p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Hola, <strong>[Nombre]</strong>:</p><p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #444444;">Retomo nuestro contacto porque en el sector B2B, cada hora que esperas por una cotización incierta es <strong>productividad perdida</strong> para <strong>[Nombre de su empresa]</strong>.</p><div style="color: #f97316; font-weight: 800; font-size: 20px; line-height: 1.3; margin: 30px 0; font-family: Arial, sans-serif; text-transform: uppercase;">LA IMPROVISACIÓN TE ESTÁ COSTANDO DINERO. PRUÉBANOS.</div><p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #444444;">En ZIENEN eliminamos esa fricción. No "intentamos" conseguir las cosas; te conectamos con inventarios reales. Si lo ves en nuestra plataforma, es porque <strong>está disponible</strong>.</p><div style="background-color: #ffffff; border: 2px solid #f97316; padding: 25px; margin: 30px 0; border-radius: 12px; text-align: center;"><p style="margin: 0 0 15px 0; font-size: 18px; color: #1a1a1a;">🚚 <strong>Entregas: Desde 24hrs</strong></p><div style="display: block; margin-top: 10px;"><span style="display: inline-block; background-color: #f4f4f7; color: #575b63; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; margin: 4px; border: 1px solid #ddd;">🛡️ EPP</span><span style="display: inline-block; background-color: #f4f4f7; color: #575b63; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; margin: 4px; border: 1px solid #ddd;">🔧 HERRAMIENTA</span><span style="display: inline-block; background-color: #f4f4f7; color: #575b63; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; margin: 4px; border: 1px solid #ddd;">⛓️ FERRETERÍA</span><span style="display: inline-block; background-color: #f4f4f7; color: #575b63; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; margin: 4px; border: 1px solid #ddd;">🏭 SUMINISTROS INDUSTRIALES</span></div></div><p style="font-size: 17px; line-height: 1.6; margin-bottom: 25px; color: #1a1a1a;">Me gustaría visitarte para que <strong>pongamos a prueba</strong> una de tus solicitudes actuales en vivo. Verás precios, stock y tiempos en segundos. ¿Qué día de esta semana te queda bien para una breve demostración?</p><div style="text-align: center; padding: 10px 0;"><a href="https://www.zienen.com/citas" style="background-color: #f97316; color: #ffffff; text-decoration: none; padding: 16px 30px; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px; box-shadow: 0 4px 10px rgba(249, 115, 22, 0.3);">📊 Agendar demo presencial</a></div><p style="font-size: 12px; color: #999999; border-top: 1px solid #eeeeee; margin-top: 40px; padding-top: 25px; text-align: center; line-height: 1.6;">Saludos,<br><strong>Equipo ZIENEN México</strong></p></td></tr></table></div>`
        },
        {
            nombre: "Cierre Cliente Actual (Control)",
            asunto: "[Nombre], menos administración y más control en tus manos",
            html: `<div style="background-color: #f4f4f7; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif; color: #333333;"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #dddddd; border-collapse: collapse; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);"><tr><td style="padding: 15px 40px; background-color: #1a1b21;"><p style="margin: 0; color: #ffffff; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 1.2px;">Análisis de Eficiencia • Zienen</p></td></tr><tr><td style="padding: 40px;"><p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Hola, <strong>[Nombre]</strong>:</p><p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #444444;">Retomo nuestro contacto porque en el sector B2B, cada hora que esperas por una cotización incierta es <strong>productividad perdida</strong> para <strong>[Nombre de su empresa]</strong>.</p><div style="color: #f97316; font-weight: 800; font-size: 20px; line-height: 1.3; margin: 30px 0; font-family: Arial, sans-serif; text-transform: uppercase;">LA IMPROVISACIÓN TE ESTÁ COSTANDO DINERO. PRUÉBANOS.</div><p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #444444;">En ZIENEN eliminamos esa fricción. No "intentamos" conseguir las cosas; te conectamos con inventarios reales. Si lo ves en nuestra plataforma, es porque <strong>está disponible</strong>.</p><div style="background-color: #ffffff; border: 2px solid #f97316; padding: 25px; margin: 30px 0; border-radius: 12px; text-align: center;"><p style="margin: 0 0 15px 0; font-size: 18px; color: #1a1a1a;">🚚 <strong>Entregas: Desde 24hrs</strong></p><div style="display: block; margin-top: 10px;"><span style="display: inline-block; background-color: #f4f4f7; color: #575b63; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; margin: 4px; border: 1px solid #ddd;">🛡️ EPP</span><span style="display: inline-block; background-color: #f4f4f7; color: #575b63; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; margin: 4px; border: 1px solid #ddd;">🔧 HERRAMIENTA</span><span style="display: inline-block; background-color: #f4f4f7; color: #575b63; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; margin: 4px; border: 1px solid #ddd;">⛓️ FERRETERÍA</span><span style="display: inline-block; background-color: #f4f4f7; color: #575b63; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; margin: 4px; border: 1px solid #ddd;">🏭 SUMINISTROS INDUSTRIALES</span></div></div><p style="font-size: 17px; line-height: 1.6; margin-bottom: 25px; color: #1a1a1a;">Me gustaría visitarte para que <strong>pongamos a prueba</strong> una de tus solicitudes actuales en vivo. Verás precios, stock y tiempos en segundos. ¿Qué día de esta semana te queda bien para una breve demostración?</p><div style="text-align: center; padding: 10px 0;"><a href="https://www.zienen.com/citas" style="background-color: #f97316; color: #ffffff; text-decoration: none; padding: 16px 30px; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px; box-shadow: 0 4px 10px rgba(249, 115, 22, 0.3);">📊 Agendar demo presencial</a></div><p style="font-size: 12px; color: #999999; border-top: 1px solid #eeeeee; margin-top: 40px; padding-top: 25px; text-align: center; line-height: 1.6;">Saludos,<br><strong>Equipo ZIENEN México</strong></p></td></tr></table></div>`
        },
        {
            nombre: "Cierre Nuevo Lead (Modelo Híbrido)",
            asunto: "[Nombre], tecnología para la rapidez + expertos para el respaldo",
            html: `<div style="background-color: #f4f4f7; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif; color: #333333;"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #dddddd; border-collapse: collapse; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);"><tr><td style="padding: 15px 40px; background-color: #0c0d12;"><p style="margin: 0; color: #ffffff; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 1.2px;">Modelo Híbrido • ZIENEN.COM</p></td></tr><tr><td style="padding: 40px;"><p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Hola, <strong>[Nombre]</strong>:</p><p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #444444;">Una preocupación común al digitalizar el suministro es: <em>"¿Qué pasa si necesito a alguien en planta?"</em>. En ZIENEN, resolvemos eso con nuestro <strong>modelo híbrido</strong>.</p><div style="color: #f97316; font-weight: 800; font-size: 20px; line-height: 1.3; margin: 30px 0; font-family: Arial, sans-serif; text-transform: uppercase;">TECNOLOGÍA DE PUNTA CON ACOMPAÑAMIENTO HUMANO</div><p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #444444;">No somos solo una web; somos un equipo técnico que te respalda. Al integrarnos como tu Hub en <strong>[Nombre de su empresa]</strong>, obtienes:</p><div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #e5e7eb;"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding-bottom: 15px;"><div style="font-size: 15px; color: #1a1a1a;"><strong>💻 Autonomía total:</strong> Consultas y pedidos sin intermediarios desde nuestra plataforma.</div></td></tr><tr><td style="padding-bottom: 15px;"><div style="font-size: 15px; color: #1a1a1a;"><strong>👷 Acompañamiento físico:</strong> Un especialista técnico asignado para levantamientos en tu sitio.</div></td></tr><tr><td><div style="font-size: 15px; color: #1a1a1a;"><strong>📊 Transparencia total:</strong> Control de pagos y estatus logístico sin errores manuales.</div></td></tr></table></div><p style="font-size: 17px; line-height: 1.6; margin-bottom: 25px; color: #1a1a1a;">Me gustaría visitarte para presentarte al <strong>especialista asignado a tu cuenta</strong> y darte un recorrido rápido por la plataforma. ¿Qué te parece <strong>pronto</strong> para una breve sesión de 15 minutos?</p><div style="text-align: center; padding: 10px 0;"><a href="https://www.zienen.com/citas" style="background-color: #f97316; color: #ffffff; text-decoration: none; padding: 16px 30px; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px; box-shadow: 0 4px 10px rgba(249, 115, 22, 0.3);">🤝 Agendar visita de presentación</a></div><p style="font-size: 12px; color: #999999; border-top: 1px solid #eeeeee; margin-top: 40px; padding-top: 25px; text-align: center; line-height: 1.6;"><em>Rapidez digital con el respaldo humano que tu planta exige.</em><br><br>Saludos,<br><strong>Equipo ZIENEN México</strong></p></td></tr></table></div>`
        }
    ];

    // CONTENEDOR PRINCIPAL
    const wrapper = document.createElement('div');
    wrapper.id = "zienen-wrapper";
    wrapper.style = `
        position: fixed; top: 100px; right: -330px; z-index: 99999;
        display: flex; align-items: flex-start; transition: right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;

    // PESTAÑA LATERAL (VISIBLE)
    const tab = document.createElement('div');
    tab.innerHTML = `<span style="transform: rotate(-90deg); display: block; white-space: nowrap; font-weight: 900; letter-spacing: 2px;">🚀 MAIL HUB</span>`;
    tab.style = `
        background: #f97316; color: #fff; padding: 60px 10px;
        border-radius: 12px 0 0 12px; cursor: pointer;
        box-shadow: -4px 0 10px rgba(0,0,0,0.1); font-family: sans-serif; font-size: 14px;
        display: flex; align-items: center; justify-content: center; width: 40px;
    `;

    // PANEL DE CONTENIDO (OCULTO)
    const container = document.createElement('div');
    container.style = `
        width: 330px; background: #fff; border-radius: 0 0 16px 16px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.15); font-family: 'Segoe UI', sans-serif;
        border: 2px solid #f97316; overflow: hidden;
    `;

    container.innerHTML = `
        <div style="background: #f97316; color: #fff; padding: 15px; font-weight: bold; font-size: 18px; text-align: center;">
             🚀 Zienen Mail Hub
        </div>
        <div style="padding: 20px;">
            <label style="font-size: 12px; color: #666; font-weight: bold; display: block; margin-bottom: 8px;">SELECCIONAR FORMATO:</label>
            <select id="sel-plantilla" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #ddd; outline: none; margin-bottom: 20px; font-size: 14px; cursor: pointer; color: #555;">
                ${plantillas.map((p, i) => `<option value="${i}">${p.nombre}</option>`).join('')}
            </select>

            <label style="font-size: 12px; color: #666; font-weight: bold; display: block; margin-bottom: 8px;">ASUNTO (CLIC PARA COPIAR):</label>
            <div id="asunto-box" style="padding: 12px; background: #fffaf5; border: 1px dashed #f97316; border-radius: 8px; font-size: 13px; color: #f97316; cursor: pointer; line-height: 1.4; margin-bottom: 20px; min-height: 40px; display: flex; align-items: center;">
                ${plantillas[0].asunto}
            </div>

            <button id="btn-copiar-html" style="width: 100%; background: #f97316; color: #fff; border: none; padding: 16px; border-radius: 12px; font-weight: bold; cursor: pointer; transition: 0.3s; font-size: 15px; box-shadow: 0 4px 10px rgba(249, 115, 22, 0.3);">
                ⚡ Copiar Cuerpo (HTML)
            </button>
        </div>
    `;

    wrapper.appendChild(tab);
    wrapper.appendChild(container);
    document.body.appendChild(wrapper);

    // LOGICA DE OCULTAR / MOSTRAR
    let isOpen = false;
    tab.onclick = () => {
        isOpen = !isOpen;
        wrapper.style.right = isOpen ? "0px" : "-334px"; // 330 de ancho + 4 de ajuste por bordes
        tab.style.background = isOpen ? "#0c0d12" : "#f97316";
    };

    const select = document.getElementById('sel-plantilla');
    const asuntoBox = document.getElementById('asunto-box');
    const btnHtml = document.getElementById('btn-copiar-html');

    // Cambiar vista según selección
    select.onchange = (e) => {
        const p = plantillas[e.target.value];
        asuntoBox.innerText = p.asunto;
    };

    // Copiar Asunto (Texto plano)
    asuntoBox.onclick = async () => {
        await navigator.clipboard.writeText(asuntoBox.innerText);
        const original = asuntoBox.innerText;
        asuntoBox.style.color = "#22c55e";
        asuntoBox.innerText = "✅ ¡Asunto Copiado!";
        setTimeout(() => {
            asuntoBox.innerText = original;
            asuntoBox.style.color = "#f97316";
        }, 1500);
    };

    // Copiar Cuerpo (HTML Rico)
    btnHtml.onclick = async () => {
        const p = plantillas[select.value];
        const type = "text/html";
        const blob = new Blob([p.html], { type });
        const data = [new ClipboardItem({ [type]: blob })];

        try {
            await navigator.clipboard.write(data);
            const originalBtn = btnHtml.innerHTML;
            btnHtml.innerHTML = "✅ ¡Listo! Pégalo en Gmail";
            btnHtml.style.background = "#22c55e";
            setTimeout(() => {
                btnHtml.innerHTML = originalBtn;
                btnHtml.style.background = "#f97316";
            }, 2500);
        } catch (err) {
            alert("Error al copiar. Asegúrate de estar usando HTTPS.");
        }
    };

})();
