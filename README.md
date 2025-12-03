# AthletIA - Prototipo UI

Sistema de administración para gimnasios que permite gestionar miembros, ejercicios y rutinas de entrenamiento con integración de IA para generación de contenido.

## Flujo General del Sistema

El prototipo cubre 8 pantallas principales que forman un flujo completo de administración:

1. **Dashboard** → Vista general con métricas y accesos rápidos
2. **Biblioteca de Ejercicios** → Búsqueda y visualización de ejercicios disponibles
3. **Crear Ejercicio** → Formulario multipaso para añadir nuevos ejercicios con generación de descripción mediante IA
4. **Detalle de Ejercicio** → Información completa de un ejercicio específico
5. **Perfil de Miembro** → Información detallada del miembro con tabs navegables
6. **Creador de Rutinas** → Interfaz drag-and-drop para diseñar rutinas personalizadas
7. **Subir Multimedia** → Carga de imágenes y videos demostrativos
8. **Layout (Navegación)** → Estructura general con sidebar y navegación principal

El flujo típico comienza en el Dashboard, donde el administrador puede navegar hacia la gestión de ejercicios, crear rutinas personalizadas para miembros, o revisar perfiles de usuarios. La integración con Gemini AI facilita la creación de contenido descriptivo para ejercicios.

---

## Pantallas del Sistema

### 1. Dashboard

**Propósito:** Proporcionar una vista general del estado del gimnasio con métricas clave y accesos directos a las funciones principales.

**Componentes principales:**
- 4 tarjetas de estadísticas (StatCard): Miembros Activos, Ingresos Mensuales, Check-ins Hoy, Ocupación Actual
- Gráfico de área (AreaChart) con ingresos de la semana
- 3 botones de acceso rápido (QuickAction): Añadir Miembro, Crear Rutina, Gestionar Ejercicios
- Tabla de últimas actividades
- Selector de período temporal para filtrar datos

<div align="center">
    <img src="/frontend/docs/img/dashboard.png" alt="Dashboard - AthletIA" width="1200" />
</div>

---

### 2. Biblioteca de Ejercicios (Exercises)

**Propósito:** Permitir la búsqueda, filtrado y navegación de todos los ejercicios disponibles en la base de datos.

**Componentes principales:**
- Barra de búsqueda con icono (Search input)
- Filtros por grupo muscular y equipo (Filter buttons)
- Botón principal "Añadir Ejercicio" con icono Plus
- Grid responsive de tarjetas de ejercicio con:
  - Imagen del ejercicio
  - Nombre del ejercicio
  - Badges de grupo muscular y equipo
  - Botón "Ver Detalles"
  - Menú de opciones (MoreVertical)

<div align="center">
    <img src="/frontend/docs/img/ejercicioslist.png" alt="ejercicioslist" width="1200" />
</div>

---

### 3. Crear Ejercicio (CreateExercise)

**Propósito:** Formulario multipaso para crear ejercicios nuevos con generación de descripciones mediante IA de Gemini.

**Componentes principales:**
- Indicador de progreso con 8 pasos
- **Paso 1 - Información básica:**
  - Input de nombre del ejercicio
  - Selectores de músculo y equipo
  - Área de texto para descripción
  - Botón "Generar con IA" (Sparkles icon)
    
<div align="center">
    <img src="/frontend/docs/img/paso1.png" alt="paso1" width="1200" />
</div>

<div align="center">
    <img src="/frontend/docs/img/paso1_1.png" alt="paso1_1" width="1200" />
</div>

- **Paso 2 - Grupos musculares:**
  - Selector de músculo principal
  - Selector de músculo secundario
     
<div align="center">
    <img src="/frontend/docs/img/paso2.png" alt="paso2" width="1200" />
</div>

- **Paso 3 - Multimedia:**
  - Zona de drag & drop para archivos
  - Vista previa de imágenes/videos
  - Botón de selección de archivos

<div align="center">
    <img src="/frontend/docs/img/paso3.png" alt="paso3" width="1200" />
</div>

<div align="center">
    <img src="/frontend/docs/img/paso3_3.png" alt="paso3_3" width="1200" />
</div>

- **Paso 4 - Instrucciones:**
  - Lista de pasos ordenados
  - Botones para añadir/eliminar instrucciones

<div align="center">
    <img src="/frontend/docs/img/paso4.png" alt="paso4" width="1200" />
</div>

- **Paso 5 - Beneficios:**
  - Formulario de título y descripción
  - Selector de categorías

<div align="center">
    <img src="/frontend/docs/img/paso5.png" alt="paso5" width="1200" />
</div>

<div align="center">
    <img src="/frontend/docs/img/paso5_5.png" alt="paso5_5" width="1200" />
</div>

- **Paso 6 - Variantes:**
  - Lista de variantes del ejercicio
  - Campos de nombre y notas

<div align="center">
    <img src="/frontend/docs/img/paso6.png" alt="paso6" width="1200" />
</div>

<div align="center">
    <img src="/frontend/docs/img/paso6_1.png" alt="paso6_1" width="1200" />
</div>

<div align="center">
    <img src="/frontend/docs/img/paso6_2.png" alt="paso6_2" width="1200" />
</div>

- **Paso 7 - Visibilidad:**
  - Toggle público/privado

<div align="center">
    <img src="/frontend/docs/img/paso7.png" alt="paso7" width="1200" />
</div>

- **Paso 8 - Vista previa:**
  - Resumen completo antes de publicar
- Botones de navegación: Anterior, Siguiente, Guardar/Publicar

<div align="center">
    <img src="/frontend/docs/img/paso8.png" alt="paso8" width="1200" />
</div>

<div align="center">
    <img src="/frontend/docs/img/paso8_1.png" alt="paso8_1" width="1200" />
</div>

---

### 4. Detalle de Ejercicio (ExerciseDetail)

**Propósito:** Mostrar información completa y detallada de un ejercicio específico con opciones de edición y eliminación.

**Componentes principales:**
- Botón de retroceso (ArrowLeft)
- Título del ejercicio con badge de visibilidad (Eye/EyeOff)
- Botones de acción: Editar (Edit icon) y Eliminar (Trash2 icon)
- Sección de información principal con:
  - Grupo muscular principal (Target icon)
  - Grupo muscular secundario (opcional)
  - Equipo necesario (Dumbbell icon)
- Carrusel o galería de multimedia (Video/ImageIcon)
- Lista ordenada de instrucciones (ListOrdered icon)
- Sección de beneficios (Heart icon)
- Variantes del ejercicio (GitBranch icon)

<div align="center">
    <img src="/frontend/docs/img/vista_ejercicios.png" alt="vista_ejercicios" width="1200" />
</div>

<div align="center">
    <img src="/frontend/docs/img/ejercicio_detalle.png" alt="ejercicio_detalle" width="1200" />
</div>

<div align="center">
    <img src="/frontend/docs/img/ejercicio_detalle2.png" alt="ejercicio_detalle2" width="1200" />
</div>
---

### 8. Layout (Navegación Principal)

**Propósito:** Proporcionar la estructura de navegación consistente en toda la aplicación.

**Componentes principales:**
- **Sidebar izquierdo:**
  - Logo de AthletIA
  - Menú de navegación con iconos:
    - Dashboard (LayoutDashboard icon)
    - Miembros (Users icon)
    - Ejercicios (Dumbbell icon)
    - Rutinas (FileText icon)
    - Multimedia (Upload icon)
  - Estado activo resaltado con fondo verde
- **Topbar:**
  - Título de página actual
  - Avatar de usuario administrador
  - Botón de configuración
- Área de contenido principal (children) con padding responsive

---

## Ejecución Local

**Prerequisitos:** Node.js 16+

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar la API Key de Gemini en `.env.local`:
   ```
   GEMINI_API_KEY=tu_api_key_aqui
   ```

3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir en el navegador: `http://localhost:5173`

## Tecnologías Utilizadas

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **React Router** - Navegación
- **Tailwind CSS** - Estilos
- **Lucide React** - Iconografía
- **Recharts** - Gráficos
- **Google Gemini AI** - Generación de contenido