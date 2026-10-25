# 🎬 CineFlix — Movie Discovery App

Discover movies, explore details, search for your favorites, and keep track of movies you want to watch.

CineFlix is a React-based movie discovery application powered by The Movie Database (TMDB) API. It provides a simple interface for browsing movies, searching for titles, viewing movie details, and managing a personal watchlist.

## ✨ Features

- **Browse Movies:** Explore popular and trending movie collections.
- **Movie Search:** Search for movies by title.
- **Movie Details:** View movie information and ratings.
- **Trailer Integration:** Access movie trailers through an embedded YouTube player.
- **My List:** Add movies to or remove movies from your personal list.
- **Persistent Storage:** My List is saved in the browser using localStorage, so saved movies remain after refreshing the page.
- **Responsive Interface:** Designed to provide a movie-browsing experience across different screen sizes.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React | Building the user interface |
| Vite | Development server and build tool |
| JavaScript | Application functionality |
| HTML5 | Application structure |
| CSS3 | Styling and layout |
| TMDB API | Movie information and data |
| YouTube Embed | Trailer playback |
| localStorage | Saving My List in the browser |
| Git and GitHub | Version control and source code hosting |

## 📸 Screenshots

Screenshots of the CineFlix interface will be added here.

Suggested screenshots:

- Home page and movie collections
- Movie search results
- Movie details and trailer modal
- My List with saved movies

To add screenshots, create a `screenshots` folder in the project root and place your images inside it.

Then add image references such as:

```markdown
![CineFlix Home Page](screenshots/home.png)

![CineFlix Search Results](screenshots/search.png)

![CineFlix Movie Details](screenshots/movie-details.png)

![CineFlix My List](screenshots/my-list.png)
```

Use the actual filenames of your screenshots.

## 🚀 Getting Started

Follow these instructions to run CineFlix locally.

### Prerequisites

Install the following:

- Node.js and npm
- Git
- A TMDB API key

### 1. Clone the Repository

```bash
git clone https://github.com/suryaprakash-sy/CineFlix.git
```

### 2. Navigate to the Project

```bash
cd CineFlix
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure the Environment Variable

Create a `.env` file in the project root.

Add your TMDB API key using the variable name expected by your application:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

Replace the placeholder with your own API key.

**Important:** Never commit your `.env` file or publish private credentials.

### 5. Start the Development Server

```bash
npm run dev
```

Open the local address printed in your terminal, usually:

```text
http://localhost:5173
```

## 📂 Project Structure

```text
CineFlix/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── MovieModal.jsx
│   │   └── MovieModal.css
│   ├── services/
│   │   └── movieApi.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## 💾 My List and Data Storage

CineFlix uses the browser's `localStorage` to retain saved movies.

- Add a movie to My List.
- Remove a movie from My List.
- Refresh the page and check that the saved list persists.

The saved list is stored locally in the browser and is not automatically synchronized across devices.

## 🔑 API and Attribution

CineFlix uses the TMDB API to retrieve movie information.

This product uses the TMDB API but is not endorsed or certified by TMDB.

TMDB attribution and applicable API terms should be followed. Review the official documentation:

- [TMDB API Documentation](https://developer.themoviedb.org/docs)
- [TMDB API Terms of Use](https://www.themoviedb.org/api-terms-of-use)
- [TMDB Logos and Attribution](https://www.themoviedb.org/about/logos-attribution)

This project is intended as a learning and portfolio project.

## 🎯 Project Goals

CineFlix was developed to practise and demonstrate skills in:

- React component development
- JavaScript event handling
- API integration
- Search and filtering
- State management
- Browser storage
- Responsive UI development
- Git and GitHub workflows

## 🔮 Future Improvements

Potential enhancements include:

- User authentication
- Cloud-synchronized watchlists
- Advanced movie filters
- Genre-based browsing
- Improved loading and error states
- More extensive responsive design testing
- Automated component and end-to-end tests

## 👨‍💻 Developer

**GitHub:** [suryaprakash-sy](https://github.com/suryaprakash-sy)

**Project Repository:** [CineFlix](https://github.com/suryaprakash-sy/CineFlix)

---

⭐ If you find this project interesting, feel free to explore the repository.
