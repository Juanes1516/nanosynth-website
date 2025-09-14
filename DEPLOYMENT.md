# Instrucciones de Despliegue para GitHub Pages

## Problema Solucionado

El problema era que los assets estaban configurados con el base path `/nanosynth-website/` en lugar de `/`, lo que causaba errores 404 cuando se accedía directamente a `https://juanes1516.github.io/`.

## Solución Implementada

1. **Corregido el base path en index.html**: Cambiado de `/nanosynth-website/assets/` a `/assets/`
2. **Creado vite.config.ts**: Configurado con `base: '/'` para futuras construcciones
3. **Creado .nojekyll**: Para asegurar que GitHub Pages sirva correctamente los archivos estáticos

## Pasos para Desplegar

1. Hacer commit de los cambios:
   ```bash
   git add .
   git commit -m "Fix GitHub Pages base path configuration"
   ```

2. Hacer push a la rama gh-pages:
   ```bash
   git push origin gh-pages
   ```

3. Verificar que el sitio funcione en:
   - `https://juanes1516.github.io/` (debería mostrar la página completa)
   - `https://juanes1516.github.io/nanosynth-website/` (también debería funcionar)

## Configuración de GitHub Pages

Asegúrate de que en la configuración de GitHub Pages:
- Source: Deploy from a branch
- Branch: gh-pages
- Folder: / (root)

## Notas Importantes

- El archivo `.nojekyll` es necesario para que GitHub Pages no procese los archivos con Jekyll
- El `vite.config.ts` asegura que futuras construcciones usen el base path correcto
- Los assets ahora se cargan desde `/assets/` en lugar de `/nanosynth-website/assets/`
