// ==UserScript==
// @name         Odoo Zienen - Master Suite v16.1 (Industrial Orange Edition)
// @namespace    http://tampermonkey.net/
// @version      16.1
// @description  Suite completa con el nuevo diseño industrial (Negro/Naranja) para Sourcing.
// @match        *://*.zienen.com/*
// @match        *://www.zienen.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Configuración de Colores (Nueva Identidad Zienen)
    const COLORES = {
        naranja: '#f97316',
        oscuroFondo: '#0c0d12',
        oscuroCard: '#1a1b21',
        borde: '#2a2c33',
        textoBlanco: '#ffffff',
        textoGris: '#e0e0e0'
    };

    // --- LÓGICA 1: SOURCING (TABLA CON NUEVO HTML) ---
    async function abrirSourcing() {
        const fullTitle = document.getElementById('name_0')?.value || "";
        const parts = fullTitle.match(/\[(.*?)\]/g)?.map(p => p.replace(/[\[\]]/g, '')) || [];
        const clienteExtracted = parts[0] || "";
        const prioridadExtracted = parts[4] || "MEDIA";

        const overlay = document.createElement('div');
        overlay.style.cssText = `position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:10000; display:flex; align-items:center; justify-content:center; font-family:sans-serif;`;

        const modal = document.createElement('div');
        modal.style.cssText = `width:700px; background:${COLORES.oscuroCard}; border-radius:20px; padding:30px; color:white; border:1px solid ${COLORES.borde}; box-shadow:0 25px 50px rgba(0,0,0,0.6);`;

        modal.innerHTML = `
            <div style="display:flex;justify-content:space-between;margin-bottom:25px; align-items:center;">
                <b style="letter-spacing:2px; color:${COLORES.naranja}; font-size:14px;">ZIENEN • SOLICITUD DE SOURCING</b>
                <button id="z-s-close" style="background:none; border:none; color:#666; cursor:pointer; font-size:20px;">✕</button>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px;">
                <div>
                    <label style="font-size:11px; color:#888; display:block; margin-bottom:8px; font-weight:bold; text-transform:uppercase;">Cliente</label>
                    <input id="zs-cliente" type="text" value="${clienteExtracted}" style="width:100%; background:#0b0f19; border:1px solid #333; padding:12px; border-radius:10px; color:white; outline:none;">
                </div>
                <div>
                    <label style="font-size:11px; color:#888; display:block; margin-bottom:8px; font-weight:bold; text-transform:uppercase;">Prioridad</label>
                    <input id="zs-prioridad" type="text" value="${prioridadExtracted}" style="width:100%; background:#0b0f19; border:1px solid #333; padding:12px; border-radius:10px; color:white; outline:none;">
                </div>
            </div>
            <div style="margin-bottom:20px;">
                <label style="font-size:11px; color:#888; display:block; margin-bottom:8px; font-weight:bold; text-transform:uppercase;">Conceptos</label>
                <div style="max-height:250px; overflow-y:auto; background:#0b0f19; border-radius:12px; padding:10px; border:1px solid #333;">
                    <table style="width:100%; border-collapse:collapse;" id="zs-table">
                        <thead>
                            <tr style="font-size:10px; color:${COLORES.naranja}; text-align:left; text-transform:uppercase;">
                                <th style="padding:10px;">Producto</th><th style="padding:10px;">Marca</th><th style="padding:10px; width:60px;">Cant.</th><th style="padding:10px; width:30px;"></th>
                            </tr>
                        </thead>
                        <tbody id="zs-tbody">
                            <tr>
                                <td><input type="text" class="zs-concept" style="width:92%; background:transparent; border:none; border-bottom:1px solid #333; padding:8px; color:white;"></td>
                                <td><input type="text" class="zs-brand" style="width:90%; background:transparent; border:none; border-bottom:1px solid #333; padding:8px; color:white;"></td>
                                <td><input type="number" class="zs-qty" value="1" style="width:90%; background:transparent; border:none; border-bottom:1px solid #333; padding:8px; color:white; text-align:center;"></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <button id="zs-add-row" style="margin-top:15px; background:rgba(249,115,22,0.1); border:1px dashed ${COLORES.naranja}; color:${COLORES.naranja}; width:100%; padding:10px; border-radius:8px; cursor:pointer; font-weight:600;">+ Agregar Producto</button>
                </div>
            </div>
            <button id="zs-send" style="width:100%; background:${COLORES.naranja}; color:black; border:none; padding:18px; border-radius:15px; font-weight:800; cursor:pointer; text-transform:uppercase;">🚀 Generar Sourcing Industrial</button>
        `;

        document.body.appendChild(overlay);
        overlay.appendChild(modal);

        document.getElementById('z-s-close').onclick = () => overlay.remove();
        document.getElementById('zs-add-row').onclick = () => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td><input type="text" class="zs-concept" style="width:92%; background:transparent; border:none; border-bottom:1px solid #333; padding:8px; color:white; margin-top:5px;"></td><td><input type="text" class="zs-brand" style="width:90%; background:transparent; border:none; border-bottom:1px solid #333; padding:8px; color:white; margin-top:5px;"></td><td><input type="number" class="zs-qty" value="1" style="width:90%; background:transparent; border:none; border-bottom:1px solid #333; padding:8px; color:white; text-align:center; margin-top:5px;"></td><td><button onclick="this.closest('tr').remove()" style="background:none; border:none; color:#ff4d4d; cursor:pointer;">✕</button></td>`;
            document.getElementById('zs-tbody').appendChild(tr);
        };

        document.getElementById('zs-send').onclick = async () => {
            const cliente = document.getElementById('zs-cliente').value;
            const prioridad = document.getElementById('zs-prioridad').value;
            const rows = document.querySelectorAll('#zs-tbody tr');
            let filasHTML = '';
            
            rows.forEach(row => {
                const c = row.querySelector('.zs-concept').value;
                const b = row.querySelector('.zs-brand').value;
                const q = row.querySelector('.zs-qty').value;
                if(c) filasHTML += `
                    <tr style="border-bottom: 1px solid #333;">
                        <td style="padding: 15px; color: #ffffff; font-size: 14px;">${c}</td>
                        <td style="padding: 15px; color: #e0e0e0; font-size: 14px; text-align: center;">${b || 'N/A'}</td>
                        <td style="padding: 15px; color: ${COLORES.naranja}; font-weight: bold; font-size: 14px; text-align: right;">${q}</td>
                    </tr>`;
            });

            // --- SUSTITUCIÓN POR EL NUEVO DISEÑO HTML ---
            const tableHTML = `
            <div style="background-color: #0c0d12; padding: 40px; font-family: 'Segoe UI', Arial, sans-serif;">
                <table width="100%" max-width="600px" align="center" style="max-width:600px; background-color: #0c0d12; border: 1px solid #2a2c33; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 40px;">
                            <p style="color: #ffffff; font-size: 16px;">Hola, <strong>Equipo de Sourcing</strong>:</p>
                            <div style="color: #f97316; font-weight: 800; font-size: 26px; line-height: 1.2; text-transform: uppercase; margin: 30px 0; font-family: 'Arial Black', sans-serif;">
                                NUEVA SOLICITUD DE SOURCING
                            </div>
                            <p style="color: #e0e0e0; font-size: 16px;">Se requiere apoyo para cotizar los siguientes elementos para <strong>${cliente}</strong> con prioridad <strong>${prioridad}</strong>:</p>
                            
                            <div style="background-color: #1a1b21; border-left: 4px solid #f97316; padding: 20px; margin: 30px 0; border: 1px solid #333;">
                                <table width="100%" style="border-collapse: collapse;">
                                    <thead>
                                        <tr style="border-bottom: 2px solid #f97316;">
                                            <th align="left" style="color: #f97316; padding: 10px; font-size: 12px; text-transform: uppercase;">Producto</th>
                                            <th style="color: #f97316; padding: 10px; font-size: 12px; text-transform: uppercase;">Marca</th>
                                            <th align="right" style="color: #f97316; padding: 10px; font-size: 12px; text-transform: uppercase;">Cant.</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${filasHTML}
                                    </tbody>
                                </table>
                            </div>

                            <div style="text-align: center; padding: 25px 0;">
                                <a href="https://www.zienen.com" style="background-color: #f97316; color: #000000; text-decoration: none; padding: 14px 35px; border-radius: 8px; font-weight: 800; display: inline-block; font-size: 17px; text-transform: uppercase;">Ver en Odoo</a>
                            </div>

                            <div style="border-top: 1px solid #333333; margin-top: 35px; padding-top: 25px; text-align: center; color: #999999; font-size: 14px;">
                                Saludos,<br><strong>Equipo Zienen México</strong>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>`;

            const blob = new Blob([tableHTML], { type: 'text/html' });
            await navigator.clipboard.write([new ClipboardItem({ 'text/html': blob })]);
            
            const editor = document.querySelector('.odoo-editor-editable');
            if (editor) editor.innerHTML += `<p style="color: #f97316; font-weight: bold;">• [Sourcing Industrial] Solicitado el ${new Date().toLocaleDateString()}</p>`;
            
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=sourcing@zienen.com&su=[SOURCING] [${prioridad}] [${cliente}]&body=Pega la tabla aquí (Ctrl+V)`, '_blank');
            overlay.remove();
        };
    }

    // --- LÓGICA 2: SOLICITAR COMPRA (CANTIDADES FALTANTES) ---
    async function ejecutarCompra() {
        const rows = [...document.querySelectorAll("tr.o_data_row")].filter(r => r.querySelector('a.fa-area-chart.text-danger'));
        if (rows.length === 0) return alert("No hay productos con faltante.");

        const panel = document.createElement('div');
        panel.style.cssText = `position:fixed; top:20px; right:20px; z-index:100000; background:#11141d; color:white; padding:20px; border-radius:15px; width:300px; font-family:sans-serif; border: 1px solid ${COLORES.naranja};`;
        panel.innerHTML = `<b style="color:${COLORES.naranja};">ZIENEN • STOCK CHECK</b><div id="z-prog" style="font-size:12px; margin-top:10px;">Analizando líneas...</div>`;
        document.body.appendChild(panel);

        const productosFinales = [];
        const cliente = (document.querySelector('div[name="partner_id"] a') || {innerText: "CLIENTE"}).innerText;
        const origen = (document.querySelector('div[name="name"] span') || {innerText: "REF"}).innerText;

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const icon = row.querySelector('a.fa-area-chart.text-danger');
            let qtySolicitada = parseFloat(row.querySelector('td[name="product_uom_qty"]')?.innerText.replace(/,/g, '') || 0);

            icon.click();
            await new Promise(r => setTimeout(r, 800));

            let qtyReservada = 0;
            const popover = document.querySelector('.o_popover, .table-borderless');
            if (popover) {
                const filaRes = [...popover.querySelectorAll('tr')].find(f => f.innerText.includes('Reservado'));
                qtyReservada = parseFloat(filaRes?.querySelector('b')?.innerText.trim() || 0);
            }

            const qtyFinal = qtySolicitada - qtyReservada;
            if (qtyFinal > 0) {
                productosFinales.push({
                    name: (row.querySelector('a.o_form_uri') || row.querySelector('td[name="product_id"]'))?.innerText.split('\n')[0],
                    qty: qtyFinal,
                    costo: row.querySelector('td[name="purchase_price"]')?.innerText || "0.00",
                    obs: qtyReservada > 0 ? `Original: ${qtySolicitada} - Reservado: ${qtyReservada}` : 'Directo'
                });
            }
            icon.click();
            document.getElementById('z-prog').innerText = `Procesando: ${i+1}/${rows.length}`;
            await new Promise(r => setTimeout(r, 400));
        }

        const filasCompra = productosFinales.map(p => `
            <tr style="border-bottom:1px solid #333;">
                <td style="padding:15px; color:white;">${p.name}</td>
                <td style="padding:15px; color:#999; font-size:12px;">${p.obs}</td>
                <td align="center" style="color:${COLORES.naranja}; font-weight:bold;">$${p.costo}</td>
                <td align="center" style="color:white;"><b>${p.qty}</b></td>
            </tr>`).join("");

        const tablaCompraHTML = `
            <div style="background-color:#0c0d12; padding:40px; font-family:sans-serif;">
                <div style="max-width:800px; margin:auto; background:#1a1b21; border-radius:20px; overflow:hidden; border:1px solid #333;">
                    <div style="background:#0c0d12; padding:35px; text-align:center; border-bottom:5px solid ${COLORES.naranja};">
                        <div style="font-size:35px; font-weight:bold; letter-spacing:6px; color:#fff;">ZIENEN</div>
                        <div style="font-size:12px; color:${COLORES.naranja}; letter-spacing:4px;">ORDEN DE COMPRA INDUSTRIAL</div>
                    </div>
                    <div style="padding:30px;">
                        <table width="100%" style="margin-bottom:20px;">
                            <tr>
                                <td><p style="font-size:10px; color:#777; margin:0;">CLIENTE</p><p style="font-size:18px; font-weight:bold; color:white; margin:5px 0;">${cliente}</p></td>
                                <td align="right"><p style="font-size:10px; color:#777; margin:0;">REF ODOO</p><p style="font-size:18px; font-weight:bold; color:${COLORES.naranja}; margin:5px 0;">${origen}</p></td>
                            </tr>
                        </table>
                        <table width="100%" style="border-collapse:collapse;">
                            <thead>
                                <tr style="background:#0c0d12; border-bottom:2px solid ${COLORES.naranja}; color:${COLORES.naranja}; font-size:11px;">
                                    <th align="left" style="padding:10px;">PRODUCTO</th>
                                    <th align="left" style="padding:10px;">OBSERVACIÓN</th>
                                    <th style="padding:10px;">COSTO</th>
                                    <th style="padding:10px;">CANT. REAL</th>
                                </tr>
                            </thead>
                            <tbody>${filasCompra}</tbody>
                        </table>
                    </div>
                </div>
            </div>`;

        panel.innerHTML = `<b style="color:#28a745;">ANÁLISIS COMPLETO</b><br><br><button id="z-c-1" style="width:100%; padding:10px; background:${COLORES.naranja}; color:black; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">1. ASUNTO Y GMAIL</button><button id="z-c-2" style="width:100%; padding:10px; background:#333; color:white; border:none; border-radius:8px; margin-top:10px; cursor:pointer;">2. COPIAR TABLA</button>`;
        
        document.getElementById('z-c-1').onclick = () => {
            navigator.clipboard.writeText(`[COMPRA] ${cliente} - ${origen}`);
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=solicitudes.compras@zienen.com`, '_blank');
        };
        document.getElementById('z-c-2').onclick = async () => {
            const blob = new Blob([tablaCompraHTML], { type: 'text/html' });
            await navigator.clipboard.write([new ClipboardItem({ 'text/html': blob })]);
            alert("¡Tabla Industrial Copiada!"); panel.remove();
        };
    }

    // --- LÓGICA 3: OPORTUNIDAD (NAMING) ---
    function abrirModalOportunidad() {
        const B=s=>`[${s}]`; const cap=s=>s.trim().toUpperCase();
        const overlay=document.createElement("div"); overlay.style.cssText="position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;font-family:sans-serif;";
        const modal=document.createElement("div"); modal.style.cssText=`width:500px; background:${COLORES.oscuroCard}; border-radius:16px; padding:25px; color:white; border:1px solid #333;`;
        modal.innerHTML = `
            <b style="font-size:14px; letter-spacing:1px; color:${COLORES.naranja};">NAMING DE OPORTUNIDAD</b>
            <div style="margin-top:15px; display:flex; flex-direction:column; gap:10px;">
                <input id="znCliente" placeholder="CLIENTE" style="padding:10px; background:#1a1f2e; border:1px solid #333; border-radius:8px; color:white;">
                <select id="znTipo" style="padding:10px; background:#1a1f2e; border:1px solid #333; border-radius:8px; color:white;">
                    <option>COTIZACIÓN</option><option>RECOMPRA</option><option>PROYECTO</option><option>URGENTE</option>
                </select>
                <input id="znProducto" placeholder="PRODUCTO CLAVE" style="padding:10px; background:#1a1f2e; border:1px solid #333; border-radius:8px; color:white;">
                <select id="znPrioridad" style="padding:10px; background:#1a1f2e; border:1px solid #333; border-radius:8px; color:white;">
                    <option>ALTA</option><option>MEDIA</option><option>BAJA</option>
                </select>
            </div>
            <button id="znCopiar" style="width:100%; margin-top:20px; padding:15px; background:${COLORES.naranja}; border:none; border-radius:10px; color:black; font-weight:bold; cursor:pointer;">COPIAR NAMING</button>
            <button id="znClose" style="width:100%; margin-top:10px; background:none; border:none; color:#666; cursor:pointer;">Cancelar</button>
        `;
        document.body.appendChild(overlay); overlay.appendChild(modal);
        document.getElementById('znClose').onclick = () => overlay.remove();
        document.getElementById('znCopiar').onclick = async () => {
            const res = `${B(cap(document.getElementById('znCliente').value))} – ${B(cap(document.getElementById('znTipo').value))} – ${B(cap(document.getElementById('znProducto').value))} – ${B(cap(document.getElementById('znPrioridad').value))}`;
            await navigator.clipboard.writeText(res);
            overlay.remove();
        };
    }

    // --- INYECCIÓN EN ODOO ---
    function inyectarBotones() {
        const systray = document.querySelector('.o_menu_systray');
        if (!systray || document.getElementById('btn-sourcing-zienen')) return;

        const container = document.createElement('div');
        container.id = 'zienen-custom-buttons';
        container.style.cssText = 'display: flex; gap: 10px; margin-right: 20px; align-items: center;';

        container.innerHTML = `
            <button id="btn-compra" style="background: ${COLORES.naranja}; color: black; border-radius: 10px; font-weight: 700; font-size: 11px; border: none; padding: 6px 12px; cursor: pointer; text-transform:uppercase;">🛒 Compra</button>
            <button id="btn-op" style="background: rgba(255,255,255,0.05); color: #ccc; border: 1px solid #444; border-radius: 10px; font-weight: 600; font-size: 11px; padding: 6px 12px; cursor: pointer;">💡 Naming</button>
            <button id="btn-sourcing-zienen" style="background: #ffffff; color: black; border-radius: 10px; font-weight: 700; font-size: 11px; border: none; padding: 6px 12px; cursor: pointer; text-transform:uppercase;">📧 Sourcing</button>
        `;

        systray.insertBefore(container, systray.firstChild);

        document.getElementById('btn-sourcing-zienen').onclick = (e) => { e.preventDefault(); abrirSourcing(); };
        document.getElementById('btn-compra').onclick = (e) => { e.preventDefault(); ejecutarCompra(); };
        document.getElementById('btn-op').onclick = (e) => { e.preventDefault(); abrirModalOportunidad(); };
    }

    setInterval(inyectarBotones, 1500);
})();
