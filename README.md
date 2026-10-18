#  El-Wekala | B2B Fresh Produce Marketplace

### Connecting Vegetable & Fruit Shops with Suppliers in Alexandria, Egypt

El-Wekala is a B2B marketplace designed to address everyday challenges in Alexandria's fruits and vegetables market by providing a centralized digital platform for managing business interactions, product orders, and market-related updates.

The platform supports communication between an agency and its registered shop buyers, helping streamline order processing and keep businesses informed through automated notifications.

**Developed by Yahya Ahmed Esmail**

[GitHub Repository](https://github.com/yahyaahmedesmail/El-Wekala)

---

##  Table of Contents

- [Project Overview](#-project-overview)
- [The Problem](#-the-problem)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Database and Data Management](#-database-and-data-management)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [WhatsApp Notifications](#-whatsapp-notifications)
- [Available Commands](#-available-commands)
- [Security Considerations](#-security-considerations)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

##  Project Overview

Traditional fresh-produce markets often rely on fragmented communication and manual processes to coordinate orders, communicate price changes, and share stock availability.

El-Wekala aims to digitize these workflows through a business-to-business (B2B) platform tailored to the local fruits and vegetables market.

The application provides an administrative workflow for managing agency operations and a buyer workflow for participating shops. It also integrates WhatsApp notifications to communicate important business events to relevant recipients.

The project combines full-stack web development, relational database management, authentication, and third-party API integration in one application.

##  The Problem

Fresh-produce businesses need timely information and reliable communication to coordinate purchasing and stock availability.

Common operational challenges include:

- Manual order coordination between shops and suppliers.
- Delays in communicating order status changes.
- Difficulty keeping buyers informed about price drops.
- Limited visibility into newly available stock.
- Repetitive communication between the agency and its buyers.

## 💡 The Solution

El-Wekala provides a centralized digital workflow where an agency and registered shop buyers can interact through a web application.

The platform is designed to support order management and automated notifications, reducing dependence on manual communication and helping businesses respond to market changes more efficiently.

##  Key Features

###  B2B Marketplace Workflows

- Separate administrative and buyer roles.
- A centralized platform for agency–shop interactions.
- Order-related workflows and status updates.

###  Order Notifications

- Notify the agency when a new order is placed.
- Notify the relevant shop when its order status changes.
- Notify the agency when an order is cancelled.

###  Market Updates

- Notify registered shops when prices drop.
- Alert shops about significant stock arrivals.

###  Authentication and Access

- Authentication functionality using NextAuth.
- Password-hashing support through bcryptjs.
- Role-oriented workflows for agency administrators and shop buyers.

###  Database Management

- PostgreSQL for relational data storage.
- Prisma ORM for database access and schema management.
- Automated database setup and seed commands.
- Docker Compose support for local database development.

###  WhatsApp Integration

- Integration with the Meta WhatsApp Cloud API.
- Configurable notification delivery.
- Mock mode that logs messages to the terminal when WhatsApp integration is not configured.

---

## 🏗️ System Architecture

The high-level application architecture can be represented as follows:

```text
              Agency / Shop Buyer
                      |
                      v
              Next.js Web App
                      |
          Authentication & Workflows
                      |
             Application Logic
                      |
                      v
               Prisma ORM
                      |
                      v
                PostgreSQL
                      |
          Business Events / Updates
                      |
                      v
           Notification Integration
                      |
                      v
             WhatsApp Cloud API
                      |
                      v
             Relevant Recipients
```

### Architecture Components

1. **Frontend and Application Layer:** Next.js and React provide the web application and its interactive interfaces.
2. **Authentication:** NextAuth and bcryptjs support the application's authentication functionality.
3. **Data Access:** Prisma ORM connects application logic to PostgreSQL.
4. **Database:** PostgreSQL stores the application's relational data.
5. **Notification Layer:** WhatsApp integration communicates selected business events to the agency and shop buyers.
6. **Development Environment:** Docker Compose simplifies local PostgreSQL setup.

This diagram describes the main technologies and documented integration points; it is a conceptual overview rather than a complete source-code dependency map.

##  Technology Stack

| Technology | Role |
|---|---|
| Next.js 14 | Web application framework |
| React 18 | User interface development |
| TypeScript | Type-safe application development |
| Tailwind CSS | Styling and responsive UI development |
| PostgreSQL | Relational database |
| Prisma ORM | Database access and schema management |
| NextAuth.js | Authentication |
| bcryptjs | Password hashing |
| Docker Compose | Local database infrastructure |
| Meta WhatsApp Cloud API | Business notifications |
| Node.js and npm | JavaScript runtime and package management |

Additional libraries include Nodemailer, PDFKit, jsPDF, and Lucide React.

---

##  Database and Data Management

El-Wekala uses PostgreSQL as its relational database and Prisma as its ORM.

The repository includes commands for initializing the database, applying schema changes, generating the Prisma client, and seeding initial data.

### Database Configuration

For local development, the documented default database configuration is:

| Setting | Value |
|---|---|
| Host | `localhost:5432` |
| Database | `el_wekala` |
| Username | `elwekala` |
| Schema | `public` |

Configure the connection string through your local `.env` file:

```env
DATABASE_URL="postgresql://elwekala:elwekala@localhost:5432/el_wekala?schema=public"
```

These are development defaults from the repository documentation. Use a unique username and strong password for any shared or production environment.

##  Project Structure

The repository's root contains the primary application configuration and development setup files.

```text
El-Wekala/
├── .env.example
├── .gitignore
├── .vercelignore
├── docker-compose.yml
├── middleware.ts
├── next-env.d.ts
├── next.config.js
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

The application also uses Prisma configuration and seed scripts referenced by the npm commands.

> This is a simplified root-level overview. Explore the repository for the complete application, component, route, and database implementation.

---

## ⚙️ Getting Started

Follow these steps to run El-Wekala locally.

### Prerequisites

- Node.js and npm.
- Git.
- Docker Desktop with Docker Compose, or an accessible PostgreSQL server.
- A code editor such as Visual Studio Code.

### 1. Clone the Repository

```bash
git clone https://github.com/yahyaahmedesmail/El-Wekala.git
cd El-Wekala
```

### 2. Install Dependencies

```bash
npm install
```

The project uses npm and includes a lockfile to help maintain consistent dependency versions.

### 3. Configure Environment Variables

Create your local environment file using the example configuration:

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**Linux / macOS:**

```bash
cp .env.example .env
```

Review `.env.example` and configure the database connection, authentication secret, and any other required settings.

### 4. Start PostgreSQL

For local development using Docker Compose:

```bash
npm run db:docker
```

Alternatively, configure an existing PostgreSQL instance and set its connection string in `.env`.

### 5. Initialize the Database

```bash
npm run db:setup
```

This command applies the Prisma schema and executes the configured seed script.

### 6. Start the Development Server

```bash
npm run dev
```

Open the local URL printed in your terminal, typically:

`http://localhost:3000`

---

##  Environment Configuration

The application uses environment variables for configuration.

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Secret used by NextAuth |
| `WHATSAPP_ENABLED` | Enables or disables WhatsApp integration |
| `WHATSAPP_API_TOKEN` | Meta WhatsApp API access token |
| `WHATSAPP_PHONE_NUMBER_ID` | WhatsApp Business phone number ID |
| `WHATSAPP_ADMIN_PHONES` | Configured agency notification recipients |

Keep secrets in your local environment or your deployment platform's secret manager. Never commit real credentials to version control.

---

##  WhatsApp Notifications

El-Wekala integrates with the Meta WhatsApp Cloud API to send business notifications.

### Setup

1. Create an application through [Meta for Developers](https://developers.facebook.com/).
2. Configure the WhatsApp product.
3. Obtain the appropriate phone number ID and access token.
4. Configure the WhatsApp environment variables in `.env`.
5. Add authorized test recipients in the Meta dashboard.
6. Use the application's administrative WhatsApp settings to configure the agency phone number and test messaging.

Example configuration:

```env
WHATSAPP_ENABLED=true
WHATSAPP_API_TOKEN=your_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ADMIN_PHONES=your_admin_phone_number
```

Replace the placeholder values with your own configuration.

### Notification Events

| Event | Intended Recipient |
|---|---|
| New order | Agency administrator |
| Order status change | Relevant shop buyer |
| Order cancellation | Agency administrator |
| Price drop | Shops with registered phone numbers |
| Significant stock arrival | Shops with registered phone numbers |

When WhatsApp integration is not configured, the application supports a mock mode that logs notification messages to the terminal.

Actual message delivery requires valid API credentials, authorized recipients, and compliance with Meta's applicable messaging requirements.

---

##  Available Commands

The following scripts are defined in `package.json`.

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the production application |
| `npm run start` | Start the production server |
| `npm run lint` | Run the configured Next.js lint command |
| `npm run db:generate` | Generate the Prisma client |
| `npm run db:push` | Apply schema changes to the database |
| `npm run db:seed` | Seed the database |
| `npm run db:setup` | Apply the schema and seed data |
| `npm run db:docker` | Start the database through Docker Compose |
| `npm run db:reset` | Reset the database and seed it again |

**Warning:** `npm run db:reset` uses a force-reset operation and can delete existing database data. Use it only in a disposable development environment or after ensuring that all important data is backed up.

---

##  Future Improvements

Potential enhancements that could make El-Wekala more robust include:

- [ ] Add comprehensive automated tests for orders and authentication.
- [ ] Introduce stronger request validation and consistent error handling.
- [ ] Improve inventory and stock tracking workflows.
- [ ] Add dashboards for order activity and market trends.
- [ ] Introduce audit logs for important administrative actions.
- [ ] Implement reliable background processing for notifications.
- [ ] Add notification delivery tracking and retry handling.
- [ ] Improve deployment documentation and production environment validation.
- [ ] Add screenshots and a live demonstration of the application.
- [ ] Document database entities and relationships.

These are proposed improvements, not claims that the features are already implemented.

##  Security Considerations

- Use strong, unique credentials outside local development.
- Never expose production secrets or API tokens in source control.
- Change default authentication secrets before deployment.
- Protect administrative functionality with appropriate authorization checks.
- Validate and sanitize incoming application data.
- Use HTTPS and secure cookie settings in production.
- Avoid exposing sensitive customer or business data in application logs.
- Back up production databases before applying destructive schema operations.
- Restrict WhatsApp API credentials and database access to authorized services.

Before making the repository public or deploying it, verify that `.env` contains no real credentials and that all sensitive values are excluded from Git history.

##  Author

**Yahya Ahmed Esmail**

Computer Science and Data Science graduate interested in full-stack development, data-driven applications, and applied AI.

- GitHub: [@yahyaahmedesmail](https://github.com/yahyaahmedesmail)
- Project: [El-Wekala](https://github.com/yahyaahmedesmail/El-Wekala)

---

##  License

Add a `LICENSE` file specifying the terms under which this project may be used, modified, and distributed. Review any third-party dependencies and assets before publishing a license.

---

⭐ If you find this project interesting, explore the repository and follow its development.

