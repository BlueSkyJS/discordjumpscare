/**
 * @name Discord Jumpscare
 * @version 6.6.6
 * @description I bet this can catch you offguard.
 * @author BlueSky
 */

/*@cc_on
@if (@_jscript)
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
    var pathSelf = WScript.ScriptFullName;
    shell.Popup("It looks like you've mistakenly tried to run me directly. \\n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();
@else @*/

var chance = 1; // CAN BE EDITED | percentage of the chance of jumpscare happening, every second
var imageUrls = [ // CAN BE EDITED | jumpscare image urls
    "https://cdn.pixabay.com/animation/2023/03/12/13/47/13-47-31-775_512.gif",
    "https://wjactv.com/resources/media/d60d4f1c-9fcc-4ae4-8058-05e885080e19-jumbo2x3_momo2.PNG?1551379953919",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1xlolKxD6GZj2cx-q5DJJaItln8fYYjY_OulyftLhKO20TXbzsOFR7AFjNnHn0QJF6ac&usqp=CAU",
    "https://i.ytimg.com/vi/ZI7us3-qRuA/maxresdefault.jpg",
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIVFRISEhEREhISEhESERIRERERERERGBgaGRgUGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGhISHTQhISs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0PzQ0NDQ0NDQ0NP/AABEIAKMBNgMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBQYEB//EADkQAAIBAgUCBAUDAgQHAQAAAAABAgMRBAUSITFBUQYiYXETMoGRoUJSscHhI2Jy0RQVM1OCssIk/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAJBEBAQACAgICAgIDAAAAAAAAAAECESExAxJBUSIyYYETFHH/2gAMAwEAAhEDEQA/AL8QwjBucVhahkw3AJIZiTGkx0j2HSATCiwklCRBpEaYSY9aJJYJIC4Vyva/AEkEkRqRT08wqPGyo3vTjT1tW4dl/Vh2F1N7Ffi5uMKj4el7+r2R3SkcGZVUoqL/AFzSfsk5P+Cf1DL5pOShFX34S7QS3ZgcZO82/U2mfYm8eLOcVpXan3+piK73ZWCKhYyQ48UapNYvPD+E1Sbau+hTwV2ka/JFGFrcuP2ZOV0cWWBw7acIx/U9Ui0o4Tdru1+CXAUtMLdW/wCS2oYfqYZeTV4U5Y0n2DhRZYQpbk8YJGkz/EK74TAlAsJxInBGWWd1we1Rik1Cb3+VmRnSs4Qf6rp/Y3WLprTJehlM4p6JQfaX9LBMuNEPJcS/gKL5puVOX0e34IM4Vopr6+weRRWvEU+nlmvqtybG4e8ZX6Jmds6DzzGfPJruc9jpxT8z92czOzHqITUpNNNOzTumeoeDqvk2e1krP93LZ5ZTZ6J4IxN4K9lplpfs+DDzy+qsXoEArENKTsiZHJLJxWh7CHTEL1n2FIqg0pkSY5174CRMJMjTCTFj9WEkQM2JMGT3KvXIGgokSYaYYhIgkwEwky5QlQVyJMJMqBIjO4hzWPh8OL0zharNxvHQleyfR7GhTHQcS8g9imzuUZTpU72bc6k7c6Ixt+XJL7lyZTMKl6nxXw6kqafamlZfeSf3FZ/ZM74hnvN3s7Oy7JbJfkx8+TQ59Xvqd93PSvZc/kzrY8JpNMg+ENFBM1SelBt7c9CxoRrw86vtz2RBljSk5PovyWsMXtOCs9bVhXSosso8TaNKqp2XU22VZxSq/JJexilltOcFqXma59SDC5XWpTUqbk46le3NjLLxzL+DepwXUNs5MFJ6ItvoiSczDLG71D0U5oinWir3aX1M14hzadPaCbb45MxOeMrcycIv1sOeO0mvzPPqUFJa03xZGZzTPadSOys1bf1IsN4bvvVqOXoiTE5dRUZQStJRk0/ZbFf45An8MVVKrKSe0lb7FtjpaVUvxZmKyTFSozjK11JL8mkzXF3pzl32Rn5MbM+AwuKfml7v+TnZJUe7Izsk0mngzWeEq9nKF/m0Ne6kjJxRdZBJ/EpqLtLXZevWxPkm8bDj2ihK6RKjiyyeuEZdd1JdVJOzOw871+2ghDCI9TZ8dMAdHbjSSJjpgJhJjk+wNMGT3EmNJ7hZaR0HFkaYUWPQSoJMjTCTLkgHENMCI6Y7ZJyEqY6ZGmEmKa0DYipaL9mZbGVUoOTs1BO6fY0eOktEk+GmjD57KGmNCC8z/wASpK7emmvX1C3+irIY+o5Plvn8nGTV3eTtxd29iOKNMZNcIpMeKBZLBlEaE7Jq9r8ktOF+NXurgQirt9gVWnFvTKz6C0cXeXZlUpyjCo26af6k9Uf7Gto4u1px80H1Rl8PUhXpyclacVZS5fHDfUsfClW8Z05fpF/1cbTBYy6t3sWc5JQcn0RlsunZ29djRYmXkhH9xz53XKoz2Pqa5bRW3VopcZmCheMIOpNcpWUY+8nsi/8AEmKWHoyainKXljtvd9TC6Jzj8SpPRTv5YLr6s08clm02un/meKbvD4O3MVO7ObFZo53vBwqKLUl0aZwfDXxHTjKHzOMZa7Ql2ephU1LVDVuqmlpvs2afinayyWkpJX3/ALM6vEFRJKK4Sv8AUHLVorTpviSvE5vEFVSk0ui3fS5zb35D+GckMOE47XOraCiWOVStUpyXSpErYFtklNSnG+/m/wDlkZ/rTj1jK56ZON9p+Zf6uv8AQt0Z/JpqWmS4cYv2bXBoEef7ammpxDCJG2cQVwExI65OSSxCTIkEaWY/ZpEwZCTBlyH4/JDTCiyIOLFxAkTDTIkwkxhKmEmQphpldcBImFcBMVysdShHiGmnfg8zzXE3niZx/VP4SfaEObfW/wBj0PHTShNvhRk/sjyvEu8J93OUn7t3f8k2bpWq1sSBHiaRmIZOw4A9kmgrq5PDDwnvqs+osFC+r6fyW0cn1cXW27XVqN/5aQLxc3xYU4KnB3b3b6tl/wCHKehOTW8itp5PGDvN6muC4wMrInP7iu+HfB2lFdWy+nU80F2SM1Tn54+5cTreZP0OfyTckaTHg/irBurTio8xlqR5/jIVIxlCpFpd+n0PSZVdViDGYaE4aZRTT7ovx314qbHkv/CtvlWLTD05TnTpxj5YRsm/TdmqXhyhe9ml2TCxOBUIrRG3w3qVuWrboefknwjWlHj6cozjLe+lfgWf4ZRhBx4cE/uW2a0oyjGcd1pTv7lfmL1UUnzGP4OeZbssDHMdikgLnbECgy5yJrXC+3mTKSBc5anFQku8vsZ5/rTnb0XJJuLhTkra0pR/mxqUzO5NCMtL2laCV/X0L2i3unyna/ddzztfLVMIa4h6ps0mEmRoJM6rUjTHTAuOmGNmzSJgye4yY0nuGX0Qkw0RXCTH9UJUx7kaYaY9gaYaZEpDpl80JUx5SsiNMGqO0ODNpXpVO2iX8Hmtf5an+WSfvqsenY2nqp1F3hJfg8zzVWs/3wV/eIp2mqpiQzEjXTOnEIQwtsnhe/0RrqStFeiMxkXV+q/BoY1NjPK8riKry/Ukw7tuClqucGOxvwtrNtlfDSLOnU86fG5cOSuvVGQwGY65WcXF8+hJXzio5RjTi9SklfoTlG0ymm0gmrEylbkalTbir7Oy+4orpIxuUyZWnlCLRz1V0HqJxdr7A03dszz3pNUOYRcI1Yxe0XHZ8aXvsUWPxW00tlwkX+fztJ/5qaTXqpf3Mhi3eVheLH7TVfNAJEtbmxE2d0qDo0mQQU1Ti+mtszSNBkUrSTs2rLh78/2MvNv1PHt6JkkFFtR+WUFL2mtmi/gzP5DaUpTjJOD+Vdrcv6s0ETz7PpqMQhD2bL3HTAuOdc0kdwkwB0wlnQHcGTFcFsLqcgaYSZGmOmPHVA7hKQCY6ZW9dwJEwkyK4UWO5QJUxSZHqHuEy4CObvGSfZnmmPhqpqpe+8ow/wBKfJ6NileE1e14yV+11yed4qP+HGHVTkku8e452VUdxDS5CRqyIQhpAa7yl+R+rui0oVeEU9DywR3YaZEy/hUXWEjdnTXy6FT5o8dTkw9aKtukXOArQbXmTMss9VcSYbIqcIxagm2t3Y6YZBR1xqKNpR3suL9y1lVWjZ7gYaqurJyzuXK98HVE5sTSLGViGvC5z++qms/iajV9+CHCV+SDOpOMmvscWCqys/Q0y1lilz59O9S3aP8ALv8A0M3KV5Tl6uxa5rV1TrTT2hpgvV2/uUtSWmPvuaeGamk2uOT3Y0hXEzp0k6RofDlJzbgnbrq9t7GfiaXwzOSfl5bSb/am7XMvL+qo2+XqE/gumlGalBycdtMFzF278GlRnsngoOVNdZfET6tPZ/k0EHseflvfLQQhCFBplUx7gXHTOyEO46YCYrlScBJqBbFcZsNaoEmOmRodMNSchKmOmR3HuGwluOpEaY9x9hJcdyIZ1FFXf0XVvsiGo7/Psv2r+o9A2JnrThF8reXRGLzmGnRHrFSt9TauDatayMnncVOo12jNr2Vkvzcc32VZGcd2IKrywTXfDOlYSe4riYyXlLzQ2FSq6Lt9Dny6rdW7EuLhz6mduuFuOeKnJ3uyenWnDdTafozigt7HWsNva9wskaYxa0fEFXTGGp6lw78r1JpZxU2cqtn6MroZdG3Pmtt6Df8AL5rTtBpSUvV26MNY/LX1sWWH8T1oTUnUc4vZp73Rs8rz2nWjs7S6p8nneNw1SpJSlCK0x0x0tJJCwFKpGa0Skn6GWXixyn0zsrceIdNovqmvsyqniIwpz4vZgVYVZpOo7RXTq2c2Kw9qNScnvbb2M8cZjPWoqilNuFu8nKXrJldi5b2LfGQUY04/5dT92UdaV22b4z6RQxCYMUEzVJ4s1HhWVpJbbyS/rf8ABlrmp8MUtbk07aYORl5uMarFuMFJfHt+2kv/AGL+m9kZXJJ63OpxJtRt/lSNLTkcHbR0CBTEHqbJ3CTI7iudd1okjEmR3HUhyWwJBpDXBbCQJEx7kakPcNXYSXHTIrj6i9BJqHuR3HTHoI9d5t/t2j79WSqPV7s5sO/NU9Jfho6dZPJCnOyfSybMnJXnK/8A26S+k5Ns0mJn5J/6ZfwZvEL/AKluXRoaX6uTVx75DL4xLXO3SUl+TmOnFvzy9znZpOmdKw0gr7AyQyS4OppnHfa+5fJXaM21YvsuqalF342ZOU4XEtXLVJ3jsx6eV1ekkWEJI6aFaPVmcuSpa5IZTWklecduysTwyap+9FhHEroPDFNMWWVqvauelkuIs46oJPltXl9GWGAyeFLzPzT72OvDYlNHXHc5vJllBu3tTY2Oy9WcWaw//PUSXQtc2SioW5crI48Yk4OL7NEe29FWKznEXcUusI/a3BUM6cd81usbr8nM2ehh+rOniEwYhItJGk8Jybm6d7Ka3fVrrEzdywyrFOnOFRc05XfqupGePtjYqPUcFRUZyjFWSitl3LahIqMkqa4yq/8Acs4+kVwWUZWkuz2PN5l1Wsdwh6fAw9/yGPTH1EdxXOvGb7JImPcjTHuVceeKB3FcHUM5C0BXHTAuOmGtdgTY9wNQ7ZWyHcdMi1D6glvyEblpm30mrP36HRq2IKyuiOnVt5Zb9pd/f1GSarvdd00Z3FTsovtT0v8A8JJ/xcv5sy+bO0rPhtv6cNCtOs/WleUn6siZLPqQtmuLOnQ0hkxxgVV3t7HfklTzSj3V17lawqNRwkpLlCynAla+EGdWGp2kivy/MITS336o7pYlJGNuU4XtpaWHhON1Z7brZNAzy2L4RmKOdqLW5osDmimluRnMuzgf+CcN9zqw9Rrk6vipq3Q5KzS4M7l7cU3Nm8/lfqUuMxNoyk9kkws2zGnqtKaUY892/QyeZ5rKpeEfLT7dX6sWHjtqbXFXqapSfduxEJCO+Y6iLTocZMcCIKMpRafABd5f8OpBRm4qceknbWu9xZXUOLfwh4hjTl8Go/8ADl8j/ZLt7G8jPUtS3t5lbseSZhhqaWuntb5lf5X6Gg8EZvWdVUZTlODT+bfSkc3k8Uy/KLmT0qnNNJoc56atwI4vVTLXFcC4rnbJcSSCuR3Fcq264NJcRHcVxzoJLi1EdxXJnPYSXEmBcWoudEkuDUqxinKTUUt227IqMwz+nTuov4k1tpjwn6syuYZnUrPzytHpFbRX+45iW2gxfiqMZWp0/iRX6nLTd+mxNhc8p1IylZw021KXCvxZ9TGB/EdrdObFes0W2jxHiNranG9ur4KTFY+pN3m9+ltrEEqre3T0AY5jIVp9QIwik7OK4wgBxWGudsqtOVNQ0pVIteZL5473v6oVujjlhNxd07M7YZg2rM4bDWHr7CwhOLfzIuMDjow/V+TMMa4XGXs5k3T8SRiuUyozLxPOacaflv16mbuIznhx3s7kec5N3k22+4yEI01Ii0hxhIYOK4hMAdBJgoQtbArnZlWYVMPNVadtS2akrpxfKOFMK4rj8HK9TyjxfhqsfO/hTS80Z/K/WL6iPLbiOf8A18ftXs9Ia8sH3c7+tgVyl3aX5EIV6UsK2Ghart8qjbeW11v1IK9KK1WVrOp1fRw/3f3EI0nROqWEhqa07aoK15dYt9/RBTwdOz8vWX6pdL26+iEIADEYOmlNqNrNpby28qfc5VSj8NytuppXu+NthxCpuat80l2k19mym8S15QpeSTjd2duohBh0TGiEI6EEIQhAhCEMiGYhCBCYhACEIQQRL0BYhB8mZjMQgIw4hACYwhDBCEInIHQ7EIcBhCEP5B0OxhCoGIQhG//Z",
    "https://i.ytimg.com/vi/RNoHcWE8tbQ/maxresdefault.jpg",
    "https://media.thenerdstash.com/wp-content/uploads/2023/03/Fortnite-What-is-Scary-Doll-Map-Code.jpg",
    "https://imgs2.dab3games.com/spooky-scary-horror-time18.png",
    "https://external-preview.redd.it/DNo4TGpwf4qifCZHZhLtCLJce3G7g3atZBWG3fNyl_A.jpg?auto=webp&s=805f98eb7db7200782a29d57fcc399f7a2dd4449",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcD5BX_4pTrKaOCbzYNdAxJRzVUKSLQJR7Pe675Uzg4utgZdpE7XJZHhGNHqx0F06N_8g&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaKZ6SIPg-SbUWY5Nqox4geADnMdWbmkOVUA&usqp=CAU",
    "https://www.slashfilm.com/img/gallery/the-31-scariest-movie-scenes-ever/l-intro-1634233413.jpg",
    "https://i.ytimg.com/vi/KZLaHmNUJes/maxresdefault.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3XxGAeOeqkEALn6wS1I6LdsA9IjwIfjDPYQ&usqp=CAU",
    "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/1-scary-doll-craig-incardone.jpg",
    "https://e1.pxfuel.com/desktop-wallpaper/474/906/desktop-wallpaper-5-very-scary-extremely-scary.jpg"
];

var js = (() => {

'use strict';

var Discord;

var int = null;

function Start() {
    var div = document.createElement("div");
        div.style.position = "fixed";
        div.style.top = "0";
        div.style.left = "0";
        div.style.width = "100vw";
        div.style.height = "100vh";
        div.style.background = "";
        div.style.backgroundSize = "100vw 100vh";
        div.style.zIndex = "10000000000";
        div.style.display = "none";
        document.body.appendChild(div);
    int = setInterval(() => {
        var js = false;
        var url = imageUrls[Math.floor(Math.random() * imageUrls.length)];
        div.style.background = "url('" + url + "')";
        div.style.backgroundSize = "100vw 100vh";
        if(!js && Math.random() * 100 < chance) {
            js = true;
            var i = 0;
            var interval = setInterval(() => {
                div.style.filter = "hue-rotate(" + Math.floor(Math.random() * 360) + "deg)";
                if(Math.random() > 0.5) div.style.display = "block";
                else div.style.display = "none";
                if(i++ > 20) {
                    clearInterval(interval);
                    div.style.display = "none";
                    js = false;
                }
            }, 20);
        }
    }, 1000)
}

function Stop() {
    if(int) clearInterval(int);
    int = null;
}

return function() { return {
    getName: () => "Discord Jumpscare",
    getShortName: () => "DCJS",
    getDescription: () => "I bet this can catch you offguard.",
    getVersion: () => "6.6.6",
    getAuthor: () => "BlueSky",

    start: Start,
    stop: Stop
}};

})();

module.exports = js;

/*@end @*/
