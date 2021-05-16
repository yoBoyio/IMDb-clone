# IeeMDB
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/yoBoyio/IMDb-clone/graphs/commit-activity)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)
![Hits](https://hitcounter.pythonanywhere.com/count/tag.svg?url=https://github.com/yoBoyio/IMDb-clone)


## Contributors
![GitHub Contributors Image](https://contrib.rocks/image?repo=yoBoyio/IMDb-clone)

### Demo Page 
You can try it at https://ieeemdb.netlify.app/



### Application Tech Stack
<img align="left" alt="C#"  width="50px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/csharp/csharp.png" /> 
<img align="left" alt=".Net"  width="50px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/dotnet/dotnet.png" /> 
<img align="left" alt="Bootstrap"  width="50px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" /> 
<img align="left" alt="Bootstrap"  width="50px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/firebase/firebase.png" /> 
<img align="left" alt="Bootstrap"  width="50px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mysql/mysql.png" /> 
<img align="left" alt="redux" height="50px" src="https://camo.githubusercontent.com/f28b5bc7822f1b7bb28a96d8d09e7d79169248fc/687474703a2f2f692e696d6775722e636f6d2f4a65567164514d2e706e67" /> 

<br/>
<br/>

### Local installation/Setup
First of all you need to have installed [ASP.NET Core](https://dotnet.microsoft.com/download) Core, [node.js](https://nodejs.org/en/download/) and [VSCode](https://code.visualstudio.com/download)

1. Clone git repository
```
git clone https://github.com/yoBoyio/IMDb-clone.git
```

2. Run backend server:
```
$ cd Back\moviesProject\moviesProject>
$ dotnet tool install --global dotnet-ef
$ dotnet run
```

3. Run react server:
```
$ cd frontend
$ npm install
$ npm start
```
If there are any issues, you may need to upgrade your node version.

4. Visit `localhost:3000` in your browser.

## Database

### User Model
Stores the data to mysql of every registered User.
| Field | Description |
| --- | --- |
|`userId`|Unique ID for every player|
|`userEmail`| User's email|
|`userName`| Username|
|`isAdmin`| If user is admin (true/false) |

### WatchList model
Stores the data to mysql of each watchlist insertion.
| Field | Description |
| --- | --- |
|`WatchlistId`| Unique ID for every Watchlist's insertion id|
|`userEmail`| Email of the user|
|`movieId`| Movies Id|

### Ratings Model
Stores the data to mysql of every Movie rating.
| Field | Description |
| --- | --- |
|`ratingId`| Unique ID for every rating|
|`userEmail`| User's email|
|`movieId`| Movies Id|
|`commentContent`| User's comment |
|`like`| User's like (true/false) |

### Movies Model
Stores the data to mysql of every Movie.
| Field | Description |
| --- | --- |
|`id`| Movie id|
|`title`| Movie's title|
|`poster_path`| Path of the movie poster|
|`overview`| Movies's overview|
|`popularity`| Popularity of the movie|
|`release_date`| Release_date of the movie |
|`vote_average`| Vote average of the movie |
|`vote_count`| vote counts of the movie |
|`original_language`| Original language of the movie |

## API

### **User Methods**
| Method | request type | parameters | Description |
| --- | --- | --- | --- |
|`api/users/info` | Get | body: Email,Password | Gets info of the user |
|`api/users/signup` | Post | body: Email,Password,Name | Registers a user|
|`api/users/login` | Get | body: Email,Password | Gets a token and info of the user |
|`api/users/info` | Get | body: Email,Password | Gets info of the user |
|`api/users/changepass` | Post | body: Email,Password,newPassword. Headers: Authentication | Gets info of the user |

### **Watchlist Methods**
| Method | request type | parameters | Description |
| --- | --- | --- | --- |
|`api/users/watchlist/get` | Get | Headers: Authentication | Gets user watchlist |
|`api/users/watchlist/insert` | Get |Body:MovieId. Headers: Authentication | Inserts to user Watchlist |
|`api/users/watchlist/remove` | Delete |Body:MovieId. Headers: Authentication | Removes Watchlist insertion |

### **Ratings Methods**
| Method | request type | parameters | Description |
| --- | --- | --- | --- |
|`api/rating/get` | Get | Params: movieId,page. Headers: Authentication | Gets ratings of a movie |
|`api/rating/get/userRating` | Get | Params: movieId. Headers: Authentication | Gets users rating of a movie |
|`api/rating/get/stats` | Get | Params: movieId | Gets movies likes,dislikes and liked percentage |
|`api/rating/get/insert` | Post | Body: MovieId,commentContent,like. Headers: Authentication | Inserts a rating to a movie |
|`api/rating/get/delete` | Delete | Body: MovieId. Headers: Authentication | Removes users rating of a movie |

### **Movies Methods**
| Method | request type | parameters | Description |
| --- | --- | --- | --- |
|`api/movieShowcase/Latest` | Get | Body: page | Gets Latest movies |
|`api/movieShowcase/Upcoming` | Get | Params: page | Gets Upcoming movies |
|`api/movieShowcase/TopRated` | Get | Params: page | Gets Top rated movies |
|`api/movieShowcase/Search` | Get | Params: query | Full text search for movie titles |
|`api/movieShowcase/movie` | Get | Params: id | Gets movie's info |
|`api/movieShowcase/Search/lang` | Get | Params: page,lang | Gets movies based on language |
|`api/movieShowcase/Search/genre` | Get | Params: page,genre | Gets movies based on genres |







