# What is Barracks?

`Barracks` is a [Bolt Action](https://www.boltaction.com/) assistant app designed to enhance your gaming experience by providing a user-friendly interface for managing your army list and tracking unit stats.
<br />
<br />
With features such as point calculation, force organization, and customizable army lists, Barracks streamlines the preparation process and allows you to focus on strategy and tactics during gameplay.
<br />
<br />
**Barracks is not associated with or endorsed by Warlord Games, the publisher of Bolt Action.**

## Getting Started

This project uses Yarn for its dependency management.
You need to install yarn first if you do not have it.

```
npm install -g yarn
```

## Database
### Using Docker
```
docker-compose up -d
docker exec -i barracks_db_1 /bin/bash -c "PGPASSWORD=postgres psql -U postgres barracks -a" < ./barracks-api/src/sql/init.sql
```

### Using local Postgres instance

```
psql -U postgres
CREATE DATABASE barracks;
\q
```

```
psql -U postgres -d barracks -a -f ./barracks-api/src/sql/init.sql
```

## Installing Dependencies

```
yarn
```

## Development

```
yarn start
```

## Building for Production

```
yarn build
```

# Contributors

- <strong>Owner/Maintainer</strong> - [fjlaubscher](https://github.com/fjlaubscher)

# License

Barracks is free software, and may be redistributed under the terms specified in the [LICENSE](LICENSE.md) file.
