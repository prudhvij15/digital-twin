# Biodegradability Dashboard

This project is a web-based dashboard to visualize biodegradability data in real-time, allowing users to interact with temperature and moisture simulation controls while viewing data trends over time.

![alt text](https://file%2B.vscode-resource.vscode-cdn.net/Users/prudhvijampana/Desktop/react/dev/Aropha/client/image.png?version%3D1734377166069)

## Features

- **Real-Time Data Visualization**: Line charts display biodegradability rate and moisture level dynamically.
- **Interactive Controls**: Users can adjust temperature and moisture levels to simulate biodegradability data.
- **3D Visualization**: A 3D bar chart renders biodegradability data for better visual representation.
- **Responsive Design**: Built with responsive UI components for seamless interaction across devices.

## Technologies Used

- **Frontend**:
  - React
  - Material-UI (MUI) for styled components
  - Chart.js and D3.js for line chart visualizations
- **Backend**:
  - Node.js with Express.js for API services
  - MySQL for database management
  - WebSocket for real-time data streaming

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 14.x)
- MySQL (>= 8.x)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

   ```Backend
   npm install for backend
   ```

3. Set up the backend:

   - Create a `.env` file in the backend directory with the following variables:

     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=<your_password>
     DB_NAME=biodegradability
     ```

   - Initialize the database:

     ```sql
     CREATE DATABASE biodegradability;
     USE biodegradability;
     CREATE TABLE biodegradability_data (
       id INT AUTO_INCREMENT PRIMARY KEY,
       time DATETIME,
       rate FLOAT,
       temperature FLOAT,
       moisture FLOAT
     );
     ```

   - Start the backend server:
     ```bash
     node index.js
     ```

4. Start the frontend application:

   ```bash
   yarn start
   ```

## Folder Structure

```
.
├── public
├── src
│   ├── components
│   │   ├── Dashboard.tsx      # Main dashboard layout
│   │   ├── Chart.tsx          # Line chart for real-time data visualization
│   │   ├── Controls.tsx       # Simulation controls with sliders
│   │   ├── ThreeD.tsx         # 3D visualization component
│   ├── services
│   │   ├── api.ts             # API calls to backend services
│   └── App.tsx
├── .env                       # Environment variables
├── README.md                  # Documentation
├── server.js                  # Backend server setup
├── package.json
└── yarn.lock
```

## Usage

1. Open the application in your browser at `http://localhost:3000`.
2. View real-time biodegradability data trends in the line chart.
3. Use the sliders in the simulation controls to adjust temperature and moisture values, which dynamically update the graph.
4. Explore the 3D bar chart for a visually rich representation of the data.

## Customization

- **Styling**: Modify `theme` configurations in `App.tsx` or directly in Material-UI components for custom themes.
- **Data API**: Update the API endpoint in `api.ts` if the backend changes.

## Future Enhancements

- Support for additional biodegradability metrics.
- Improved 3D rendering with advanced animations.
- Integration with real-world data sources.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Chart.js](https://www.chartjs.org/)
- [D3.js](https://www/d3js.org)
- [Material-UI](https://mui.com/)
