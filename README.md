# Astra Universe Partner

Una **app** donde los usuarios pueden explorar un mapa interactivo de galaxias y planetas del universo de rol. Cada planeta y raza tiene su propia página con lore, estadísticas y una sección de misiones o eventos. El objetivo es dar vida visual al universo y que los jugadores lo consulten tanto dentro como fuera de Discord.

---

## Estructura del Proyecto

```
/src
  /api            # Funciones para llamar a endpoints (axios instances)
  /components     # Componentes genéricos: Button, Card, Avatar, Loader…
  /screens
    Auth
      LoginScreen.js
      RegisterScreen.js
    Home
      MapScreen.js
      PlanetaDetailScreen.js
    Profile
      ProfileScreen.js
      EditProfileScreen.js
    Catalogs
      HabilidadesScreen.js
      MisionesScreen.js
    Offline
      LoreOfflineScreen.js
  /navigation     # Definiciones de navegadores (Stacks / Tabs)
  /context        # (Opcional) Contexto para manejar auth y user global
  /utils          # Helpers: formatFecha, validarEmail, etc.
  /assets         # Imágenes, íconos estáticos
App.js
```

---

## Funcionalidades

1. **Registro/Login**
    - Registro con email, contraseña y nombre de usuario.
    - Login para autenticar y guardar JWT localmente.

2. **Perfil de Usuario / Personaje**
    - Crear o editar personaje: nombre, avatar (subida o selección), raza, planeta de origen, Ki/XP inicial (0).
    - Ver pantalla de perfil con Ki total, XP total y lista de transformaciones desbloqueadas.

3. **Mapa de Galaxias / Planetas**
    - Mapa 2D (o esquemático) de galaxias y planetas.
    - Los “pins” se obtienen del API (`GET /api/planetas` y `GET /api/galaxias`).
    - Al tocar un planeta, se muestra su ficha: nombre, imagen, descripción, fundador, razas asociadas.

4. **Listado de Habilidades**
    - Pantalla “Habilidades” con catálogo fijo de técnicas aprobadas desde el API.

5. **Listado de Misiones**
    - Pantalla “Misiones” con catálogo informativo de misiones activas (título, descripción, recompensaXP).

6. **Notificaciones Push de Ki**
    - Al alcanzar múltiplos de 10 000 Ki, la app envía un push recordando que se ha desbloqueado una nueva habilidad/transformación.

7. **Modo Offline de Lore / Descripciones**
    - Descarga inicial de planetas y descripciones para consulta offline.

---

## Descripción General

- Navega por un universo visual de galaxias y planetas.
- Consulta lore, estadísticas y eventos de cada planeta y raza.
- Accede a misiones y habilidades del universo.
- Consulta información incluso sin conexión.

---

## Instalación del proyecto

### 1. Clona o haz fork del repositorio

```sh
git clone https://github.com/tuusuario/tu-repo.git
cd tu-repo
```

### 2. Instala las dependencias del backend

```sh
cd backend
npm install
```

### 3. Instala las dependencias del frontend

```sh
cd ../frontend
npm install
```

### 4. Configura las variables de entorno

- Copia los archivos `.env.example` a `.env` tanto en `/backend` como en `/frontend` y completa los valores necesarios.

### 5. Ejecuta el proyecto

(Sigue las instrucciones específicas para levantar backend y frontend)

---

## Contribución

Pull requests y sugerencias son bienvenidas.

---
