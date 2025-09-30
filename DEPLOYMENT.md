# Instrucciones de Despliegue para GitHub Pages

## Problema Solucionado

El problema era que los assets estaban configurados con el base path `/nanosynth-website/` en lugar de `/`, lo que causaba errores 404 cuando se accedía directamente a `https://juanes1516.github.io/`.

## Solución Implementada

1. **Configurar variable VITE_BASE_URL**: Define `/nanosynth-website/` durante los builds destinados a GitHub Pages.
2. **Actualizado `vite.config.ts`**: Usa `process.env.VITE_BASE_URL ?? '/nanosynth-website/'` como base.
3. **Agregado `public/404.html`**: Con redirección para soportar recargas de rutas del SPA en GitHub Pages.
4. **Creado `.nojekyll`**: Para evitar que GitHub Pages procese los archivos con Jekyll.

## Pasos para Desplegar

### Para Desarrollo Local:
```bash
npm run dev
```
Esto abrirá el sitio en `http://localhost:5173/` con el base path `/`

### Para GitHub Pages:
1. Construir el proyecto con el base path correcto:
   ```bash
   npm run build:gh-pages
   ```

2. Hacer commit de los cambios:
   ```bash
   git add .
   git commit -m "Fix GitHub Pages base path configuration"
   ```

3. Hacer push a la rama gh-pages:
   ```bash
   git push origin gh-pages
   ```

4. Verificar que el sitio funcione en:
   - `https://juanes1516.github.io/nanosynth-website/` (ruta principal)
   - Las rutas internas del SPA deberían funcionar correctamente

## Configuración de GitHub Pages

Asegúrate de que en la configuración de GitHub Pages:
- Source: Deploy from a branch
- Branch: gh-pages
- Folder: / (root)

## Notas Importantes

- **Desarrollo Local**: Usa `npm run dev` - el sitio se sirve desde `/` (raíz)
- **GitHub Pages**: Usa `npm run build:gh-pages` - el sitio se sirve desde `/nanosynth-website/`
- El archivo `.nojekyll` es necesario para que GitHub Pages no procese los archivos con Jekyll
- El `vite.config.ts` detecta automáticamente el entorno y configura el base path apropiado
- `public/404.html` permite recargar rutas internas del SPA sin errores 404 en GitHub Pages
- **IMPORTANTE**: Siempre usa `npm run build:gh-pages` antes de hacer deploy a GitHub Pages
