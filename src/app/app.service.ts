import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

@Injectable()
export class AppService {
    constructor() { }

    private products = [
      {"id":1,"name":"For Those About To Rock We Salute You","vendor_id":1,"requires_shipping":false,"sku":"ALBUM-1","taxable":true,"status":"available","price":1004,"vendor":{"id":1,"name":"AC/DC"},"details":[{"track_id":14,"name":"Spellbound","album_id":1,"media_type_id":1,"genre_id":1,"composer":"Angus Young, Malcolm Young, Brian Johnson","milliseconds":270863,"bytes":8817038,"unit_price":0.99},{"track_id":13,"name":"Night Of The Long Knives","album_id":1,"media_type_id":1,"genre_id":1,"composer":"Angus Young, Malcolm Young, Brian Johnson","milliseconds":205688,"bytes":6706347,"unit_price":0.99},{"track_id":12,"name":"Breaking The Rules","album_id":1,"media_type_id":1,"genre_id":1,"composer":"Angus Young, Malcolm Young, Brian Johnson","milliseconds":263288,"bytes":8596840,"unit_price":0.99},{"track_id":11,"name":"C.O.D.","album_id":1,"media_type_id":1,"genre_id":1,"composer":"Angus Young, Malcolm Young, Brian Johnson","milliseconds":199836,"bytes":6566314,"unit_price":0.99},{"track_id":10,"name":"Evil Walks","album_id":1,"media_type_id":1,"genre_id":1,"composer":"Angus Young, Malcolm Young, Brian Johnson","milliseconds":263497,"bytes":8611245,"unit_price":0.99},{"track_id":9,"name":"Snowballed","album_id":1,"media_type_id":1,"genre_id":1,"composer":"Angus Young, Malcolm Young, Brian Johnson","milliseconds":203102,"bytes":6599424,"unit_price":0.99},{"track_id":8,"name":"Inject The Venom","album_id":1,"media_type_id":1,"genre_id":1,"composer":"Angus Young, Malcolm Young, Brian Johnson","milliseconds":210834,"bytes":6852860,"unit_price":0.99},{"track_id":7,"name":"Let's Get It Up","album_id":1,"media_type_id":1,"genre_id":1,"composer":"Angus Young, Malcolm Young, Brian Johnson","milliseconds":233926,"bytes":7636561,"unit_price":0.99},{"track_id":6,"name":"Put The Finger On You","album_id":1,"media_type_id":1,"genre_id":1,"composer":"Angus Young, Malcolm Young, Brian Johnson","milliseconds":205662,"bytes":6713451,"unit_price":0.99},{"track_id":1,"name":"For Those About To Rock (We Salute You)","album_id":1,"media_type_id":1,"genre_id":1,"composer":"Angus Young, Malcolm Young, Brian Johnson","milliseconds":343719,"bytes":11170334,"unit_price":0.99}]},
      {"id":2,"name":"Balls to the Wall","vendor_id":2,"requires_shipping":false,"sku":"ALBUM-2","taxable":true,"status":"available","price":948,"vendor":{"id":2,"name":"Accept"},"details":[{"track_id":2,"name":"Balls to the Wall","album_id":2,"media_type_id":2,"genre_id":1,"composer":null,"milliseconds":342562,"bytes":5510424,"unit_price":0.99}]},
      {"id":3,"name":"Restless and Wild","vendor_id":2,"requires_shipping":false,"sku":"ALBUM-3","taxable":true,"status":"available","price":1570,"vendor":{"id":2,"name":"Accept"},"details":[{"track_id":5,"name":"Princess of the Dawn","album_id":3,"media_type_id":2,"genre_id":1,"composer":"Deaffy & R.A. Smith-Diesel","milliseconds":375418,"bytes":6290521,"unit_price":0.99},{"track_id":4,"name":"Restless and Wild","album_id":3,"media_type_id":2,"genre_id":1,"composer":"F. Baltes, R.A. Smith-Diesel, S. Kaufman, U. Dirkscneider & W. Hoffman","milliseconds":252051,"bytes":4331779,"unit_price":0.99},{"track_id":3,"name":"Fast As a Shark","album_id":3,"media_type_id":2,"genre_id":1,"composer":"F. Baltes, S. Kaufman, U. Dirkscneider & W. Hoffman","milliseconds":230619,"bytes":3990994,"unit_price":0.99}]},
      {"id":4,"name":"Let There Be Rock","vendor_id":1,"requires_shipping":false,"sku":"ALBUM-4","taxable":true,"status":"available","price":1598,"vendor":{"id":1,"name":"AC/DC"},"details":[{"track_id":22,"name":"Whole Lotta Rosie","album_id":4,"media_type_id":1,"genre_id":1,"composer":"AC/DC","milliseconds":323761,"bytes":10547154,"unit_price":0.99},{"track_id":21,"name":"Hell Ain't A Bad Place To Be","album_id":4,"media_type_id":1,"genre_id":1,"composer":"AC/DC","milliseconds":254380,"bytes":8331286,"unit_price":0.99},{"track_id":20,"name":"Overdose","album_id":4,"media_type_id":1,"genre_id":1,"composer":"AC/DC","milliseconds":369319,"bytes":12066294,"unit_price":0.99},{"track_id":19,"name":"Problem Child","album_id":4,"media_type_id":1,"genre_id":1,"composer":"AC/DC","milliseconds":325041,"bytes":10617116,"unit_price":0.99},{"track_id":18,"name":"Bad Boy Boogie","album_id":4,"media_type_id":1,"genre_id":1,"composer":"AC/DC","milliseconds":267728,"bytes":8776140,"unit_price":0.99},{"track_id":17,"name":"Let There Be Rock","album_id":4,"media_type_id":1,"genre_id":1,"composer":"AC/DC","milliseconds":366654,"bytes":12021261,"unit_price":0.99},{"track_id":16,"name":"Dog Eat Dog","album_id":4,"media_type_id":1,"genre_id":1,"composer":"AC/DC","milliseconds":215196,"bytes":7032162,"unit_price":0.99},{"track_id":15,"name":"Go Down","album_id":4,"media_type_id":1,"genre_id":1,"composer":"AC/DC","milliseconds":331180,"bytes":10847611,"unit_price":0.99}]},
      {"id":5,"name":"Big Ones","vendor_id":3,"requires_shipping":false,"sku":"ALBUM-5","taxable":true,"status":"available","price":1514,"vendor":{"id":3,"name":"Aerosmith"},"details":[{"track_id":37,"name":"Livin' On The Edge","album_id":5,"media_type_id":1,"genre_id":1,"composer":"Steven Tyler, Joe Perry, Mark Hudson","milliseconds":381231,"bytes":12374569,"unit_price":0.99},{"track_id":36,"name":"Angel","album_id":5,"media_type_id":1,"genre_id":1,"composer":"Steven Tyler, Desmond Child","milliseconds":307617,"bytes":9989331,"unit_price":0.99},{"track_id":35,"name":"Eat The Rich","album_id":5,"media_type_id":1,"genre_id":1,"composer":"Steven Tyler, Joe Perry, Jim Vallance","milliseconds":251036,"bytes":8262039,"unit_price":0.99},{"track_id":34,"name":"Crazy","album_id":5,"media_type_id":1,"genre_id":1,"composer":"Steven Tyler, Joe Perry, Desmond Child","milliseconds":316656,"bytes":10402398,"unit_price":0.99},{"track_id":33,"name":"The Other Side","album_id":5,"media_type_id":1,"genre_id":1,"composer":"Steven Tyler, Jim Vallance","milliseconds":244375,"bytes":7983270,"unit_price":0.99},{"track_id":32,"name":"Deuces Are Wild","album_id":5,"media_type_id":1,"genre_id":1,"composer":"Steven Tyler, Jim Vallance","milliseconds":215875,"bytes":7074167,"unit_price":0.99},{"track_id":31,"name":"Blind Man","album_id":5,"media_type_id":1,"genre_id":1,"composer":"Steven Tyler, Joe Perry, Taylor Rhodes","milliseconds":240718,"bytes":7877453,"unit_price":0.99},{"track_id":30,"name":"Amazing","album_id":5,"media_type_id":1,"genre_id":1,"composer":"Steven Tyler, Richie Supa","milliseconds":356519,"bytes":11616195,"unit_price":0.99},{"track_id":29,"name":"Cryin'","album_id":5,"media_type_id":1,"genre_id":1,"composer":"Steven Tyler, Joe Perry, Taylor Rhodes","milliseconds":309263,"bytes":10056995,"unit_price":0.99},{"track_id":28,"name":"Janie's Got A Gun","album_id":5,"media_type_id":1,"genre_id":1,"composer":"Steven Tyler, Tom Hamilton","milliseconds":330736,"bytes":10869391,"unit_price":0.99},{"track_id":27,"name":"Dude (Looks Like A Lady)","album_id":5,"media_type_id":1,"genre_id":1,"composer":"Steven Tyler, Joe Perry, Desmond Child","milliseconds":264855,"bytes":8679940,"unit_price":0.99},{"track_id":26,"name":"What It Takes","album_id":5,"media_type_id":1,"genre_id":1,"composer":"Steven Tyler, Joe Perry, Desmond Child","milliseconds":310622,"bytes":10144730,"unit_price":0.99},{"track_id":25,"name":"Rag Doll","album_id":5,"media_type_id":1,"genre_id":1,"composer":"Steven Tyler, Joe Perry, Jim Vallance, Holly Knight","milliseconds":264698,"bytes":8675345,"unit_price":0.99},{"track_id":24,"name":"Love In An Elevator","album_id":5,"media_type_id":1,"genre_id":1,"composer":"Steven Tyler, Joe Perry","milliseconds":321828,"bytes":10552051,"unit_price":0.99},{"track_id":23,"name":"Walk On Water","album_id":5,"media_type_id":1,"genre_id":1,"composer":"Steven Tyler, Joe Perry, Jack Blades, Tommy Shaw","milliseconds":295680,"bytes":9719579,"unit_price":0.99}]},
      {"id":6,"name":"Jagged Little Pill","vendor_id":4,"requires_shipping":false,"sku":"ALBUM-6","taxable":true,"status":"available","price":919,"vendor":{"id":4,"name":"Alanis Morissette"},"details":[{"track_id":50,"name":"You Oughta Know (Alternate)","album_id":6,"media_type_id":1,"genre_id":1,"composer":"Alanis Morissette & Glenn Ballard","milliseconds":491885,"bytes":16008629,"unit_price":0.99},{"track_id":49,"name":"Wake Up","album_id":6,"media_type_id":1,"genre_id":1,"composer":"Alanis Morissette & Glenn Ballard","milliseconds":293485,"bytes":9703359,"unit_price":0.99},{"track_id":48,"name":"Not The Doctor","album_id":6,"media_type_id":1,"genre_id":1,"composer":"Alanis Morissette & Glenn Ballard","milliseconds":227631,"bytes":7604601,"unit_price":0.99},{"track_id":47,"name":"Ironic","album_id":6,"media_type_id":1,"genre_id":1,"composer":"Alanis Morissette & Glenn Ballard","milliseconds":229825,"bytes":7598866,"unit_price":0.99},{"track_id":46,"name":"Mary Jane","album_id":6,"media_type_id":1,"genre_id":1,"composer":"Alanis Morissette & Glenn Ballard","milliseconds":280607,"bytes":9163588,"unit_price":0.99},{"track_id":45,"name":"Head Over Feet","album_id":6,"media_type_id":1,"genre_id":1,"composer":"Alanis Morissette & Glenn Ballard","milliseconds":267493,"bytes":8758008,"unit_price":0.99},{"track_id":44,"name":"You Learn","album_id":6,"media_type_id":1,"genre_id":1,"composer":"Alanis Morissette & Glenn Ballard","milliseconds":239699,"bytes":7824837,"unit_price":0.99},{"track_id":43,"name":"Forgiven","album_id":6,"media_type_id":1,"genre_id":1,"composer":"Alanis Morissette & Glenn Ballard","milliseconds":300355,"bytes":9753256,"unit_price":0.99},{"track_id":42,"name":"Right Through You","album_id":6,"media_type_id":1,"genre_id":1,"composer":"Alanis Morissette & Glenn Ballard","milliseconds":176117,"bytes":5793082,"unit_price":0.99},{"track_id":41,"name":"Hand In My Pocket","album_id":6,"media_type_id":1,"genre_id":1,"composer":"Alanis Morissette & Glenn Ballard","milliseconds":221570,"bytes":7224246,"unit_price":0.99},{"track_id":40,"name":"Perfect","album_id":6,"media_type_id":1,"genre_id":1,"composer":"Alanis Morissette & Glenn Ballard","milliseconds":188133,"bytes":6145404,"unit_price":0.99},{"track_id":39,"name":"You Oughta Know","album_id":6,"media_type_id":1,"genre_id":1,"composer":"Alanis Morissette & Glenn Ballard","milliseconds":249234,"bytes":8196916,"unit_price":0.99},{"track_id":38,"name":"All I Really Want","album_id":6,"media_type_id":1,"genre_id":1,"composer":"Alanis Morissette & Glenn Ballard","milliseconds":284891,"bytes":9375567,"unit_price":0.99}]},
      {"id":7,"name":"Facelift","vendor_id":5,"requires_shipping":false,"sku":"ALBUM-7","taxable":true,"status":"available","price":1314,"vendor":{"id":5,"name":"Alice In Chains"},"details":[{"track_id":62,"name":"Real Thing","album_id":7,"media_type_id":1,"genre_id":1,"composer":"Jerry Cantrell, Layne Staley","milliseconds":243879,"bytes":7937731,"unit_price":0.99},{"track_id":61,"name":"I Know Somethin (Bout You)","album_id":7,"media_type_id":1,"genre_id":1,"composer":"Jerry Cantrell","milliseconds":261955,"bytes":8497788,"unit_price":0.99},{"track_id":60,"name":"Confusion","album_id":7,"media_type_id":1,"genre_id":1,"composer":"Jerry Cantrell, Michael Starr, Layne Staley","milliseconds":344163,"bytes":11183647,"unit_price":0.99},{"track_id":59,"name":"Put You Down","album_id":7,"media_type_id":1,"genre_id":1,"composer":"Jerry Cantrell","milliseconds":196231,"bytes":6420530,"unit_price":0.99},{"track_id":58,"name":"Sunshine","album_id":7,"media_type_id":1,"genre_id":1,"composer":"Jerry Cantrell","milliseconds":284969,"bytes":9216057,"unit_price":0.99},{"track_id":57,"name":"It Ain't Like That","album_id":7,"media_type_id":1,"genre_id":1,"composer":"Jerry Cantrell, Michael Starr, Sean Kinney","milliseconds":277577,"bytes":8993793,"unit_price":0.99},{"track_id":56,"name":"Love, Hate, Love","album_id":7,"media_type_id":1,"genre_id":1,"composer":"Jerry Cantrell, Layne Staley","milliseconds":387134,"bytes":12575396,"unit_price":0.99},{"track_id":55,"name":"I Can't Remember","album_id":7,"media_type_id":1,"genre_id":1,"composer":"Jerry Cantrell, Layne Staley","milliseconds":222955,"bytes":7302550,"unit_price":0.99},{"track_id":54,"name":"Bleed The Freak","album_id":7,"media_type_id":1,"genre_id":1,"composer":"Jerry Cantrell","milliseconds":241946,"bytes":7847716,"unit_price":0.99},{"track_id":53,"name":"Sea Of Sorrow","album_id":7,"media_type_id":1,"genre_id":1,"composer":"Jerry Cantrell","milliseconds":349831,"bytes":11316328,"unit_price":0.99},{"track_id":52,"name":"Man In The Box","album_id":7,"media_type_id":1,"genre_id":1,"composer":"Jerry Cantrell, Layne Staley","milliseconds":286641,"bytes":9310272,"unit_price":0.99},{"track_id":51,"name":"We Die Young","album_id":7,"media_type_id":1,"genre_id":1,"composer":"Jerry Cantrell","milliseconds":152084,"bytes":4925362,"unit_price":0.99}]},
      {"id":8,"name":"Warner 25 Anos","vendor_id":6,"requires_shipping":false,"sku":"ALBUM-8","taxable":true,"status":"available","price":1053,"vendor":{"id":6,"name":"Antônio Carlos Jobim"},"details":[{"track_id":76,"name":"Canta, Canta Mais","album_id":8,"media_type_id":1,"genre_id":2,"composer":null,"milliseconds":271856,"bytes":8719426,"unit_price":0.99},{"track_id":75,"name":"O Boto (Bôto)","album_id":8,"media_type_id":1,"genre_id":2,"composer":null,"milliseconds":366837,"bytes":12089673,"unit_price":0.99},{"track_id":74,"name":"Outra Vez","album_id":8,"media_type_id":1,"genre_id":2,"composer":null,"milliseconds":126511,"bytes":4110053,"unit_price":0.99},{"track_id":73,"name":"Corcovado (Quiet Nights Of Quiet Stars)","album_id":8,"media_type_id":1,"genre_id":2,"composer":null,"milliseconds":205662,"bytes":6687994,"unit_price":0.99},{"track_id":72,"name":"Angela","album_id":8,"media_type_id":1,"genre_id":2,"composer":null,"milliseconds":169508,"bytes":5574957,"unit_price":0.99},{"track_id":71,"name":"Falando De Amor","album_id":8,"media_type_id":1,"genre_id":2,"composer":null,"milliseconds":219663,"bytes":7121735,"unit_price":0.99},{"track_id":70,"name":"Se Todos Fossem Iguais A Você (Instrumental)","album_id":8,"media_type_id":1,"genre_id":2,"composer":null,"milliseconds":134948,"bytes":4393377,"unit_price":0.99},{"track_id":69,"name":"Dindi (Dindi)","album_id":8,"media_type_id":1,"genre_id":2,"composer":null,"milliseconds":253178,"bytes":8149148,"unit_price":0.99},{"track_id":68,"name":"Fotografia","album_id":8,"media_type_id":1,"genre_id":2,"composer":null,"milliseconds":129227,"bytes":4198774,"unit_price":0.99},{"track_id":67,"name":"Ligia","album_id":8,"media_type_id":1,"genre_id":2,"composer":null,"milliseconds":251977,"bytes":8226934,"unit_price":0.99},{"track_id":66,"name":"Por Causa De Você","album_id":8,"media_type_id":1,"genre_id":2,"composer":null,"milliseconds":169900,"bytes":5536496,"unit_price":0.99},{"track_id":65,"name":"Samba De Uma Nota Só (One Note Samba)","album_id":8,"media_type_id":1,"genre_id":2,"composer":null,"milliseconds":137273,"bytes":4535401,"unit_price":0.99},{"track_id":64,"name":"Garota De Ipanema","album_id":8,"media_type_id":1,"genre_id":2,"composer":null,"milliseconds":285048,"bytes":9348428,"unit_price":0.99},{"track_id":63,"name":"Desafinado","album_id":8,"media_type_id":1,"genre_id":2,"composer":null,"milliseconds":185338,"bytes":5990473,"unit_price":0.99}]},
      {"id":9,"name":"Plays Metallica By Four Cellos","vendor_id":7,"requires_shipping":false,"sku":"ALBUM-9","taxable":true,"status":"available","price":886,"vendor":{"id":7,"name":"Apocalyptica"},"details":[{"track_id":84,"name":"Welcome Home (Sanitarium)","album_id":9,"media_type_id":1,"genre_id":3,"composer":"Apocalyptica","milliseconds":350197,"bytes":11406431,"unit_price":0.99},{"track_id":83,"name":"Wherever I May Roam","album_id":9,"media_type_id":1,"genre_id":3,"composer":"Apocalyptica","milliseconds":369345,"bytes":12033110,"unit_price":0.99},{"track_id":82,"name":"Creeping Death","album_id":9,"media_type_id":1,"genre_id":3,"composer":"Apocalyptica","milliseconds":308035,"bytes":10110980,"unit_price":0.99},{"track_id":81,"name":"Sad But True","album_id":9,"media_type_id":1,"genre_id":3,"composer":"Apocalyptica","milliseconds":288208,"bytes":9405526,"unit_price":0.99},{"track_id":80,"name":"The Unforgiven","album_id":9,"media_type_id":1,"genre_id":3,"composer":"Apocalyptica","milliseconds":322925,"bytes":10422447,"unit_price":0.99},{"track_id":79,"name":"Harvester Of Sorrow","album_id":9,"media_type_id":1,"genre_id":3,"composer":"Apocalyptica","milliseconds":374543,"bytes":12372536,"unit_price":0.99},{"track_id":78,"name":"Master Of Puppets","album_id":9,"media_type_id":1,"genre_id":3,"composer":"Apocalyptica","milliseconds":436453,"bytes":14375310,"unit_price":0.99},{"track_id":77,"name":"Enter Sandman","album_id":9,"media_type_id":1,"genre_id":3,"composer":"Apocalyptica","milliseconds":221701,"bytes":7286305,"unit_price":0.99}]},
      {"id":10,"name":"Audioslave","vendor_id":8,"requires_shipping":false,"sku":"ALBUM-10","taxable":true,"status":"available","price":1314,"vendor":{"id":8,"name":"Audioslave"},"details":[{"track_id":98,"name":"The Last Remaining Light","album_id":10,"media_type_id":1,"genre_id":1,"composer":"Audioslave/Chris Cornell","milliseconds":317492,"bytes":7622615,"unit_price":0.99},{"track_id":97,"name":"Getaway Car","album_id":10,"media_type_id":1,"genre_id":1,"composer":"Audioslave/Chris Cornell","milliseconds":299598,"bytes":7193162,"unit_price":0.99},{"track_id":96,"name":"Light My Way","album_id":10,"media_type_id":1,"genre_id":1,"composer":"Audioslave/Chris Cornell","milliseconds":303595,"bytes":7289084,"unit_price":0.99},{"track_id":95,"name":"Bring'em Back Alive","album_id":10,"media_type_id":1,"genre_id":1,"composer":"Audioslave/Chris Cornell","milliseconds":329534,"bytes":7911634,"unit_price":0.99},{"track_id":94,"name":"Hypnotize","album_id":10,"media_type_id":1,"genre_id":1,"composer":"Audioslave/Chris Cornell","milliseconds":206628,"bytes":4961887,"unit_price":0.99},{"track_id":93,"name":"Exploder","album_id":10,"media_type_id":1,"genre_id":1,"composer":"Audioslave/Chris Cornell","milliseconds":206053,"bytes":4948095,"unit_price":0.99},{"track_id":92,"name":"I am the Highway","album_id":10,"media_type_id":1,"genre_id":1,"composer":"Audioslave/Chris Cornell","milliseconds":334942,"bytes":8041411,"unit_price":0.99},{"track_id":91,"name":"Shadow on the Sun","album_id":10,"media_type_id":1,"genre_id":1,"composer":"Audioslave/Chris Cornell","milliseconds":343457,"bytes":8245793,"unit_price":0.99},{"track_id":90,"name":"Set It Off","album_id":10,"media_type_id":1,"genre_id":1,"composer":"Audioslave/Chris Cornell","milliseconds":263262,"bytes":6321091,"unit_price":0.99},{"track_id":89,"name":"Like a Stone","album_id":10,"media_type_id":1,"genre_id":1,"composer":"Audioslave/Chris Cornell","milliseconds":294034,"bytes":7059624,"unit_price":0.99},{"track_id":88,"name":"What You Are","album_id":10,"media_type_id":1,"genre_id":1,"composer":"Audioslave/Chris Cornell","milliseconds":249391,"bytes":5988186,"unit_price":0.99},{"track_id":87,"name":"Gasoline","album_id":10,"media_type_id":1,"genre_id":1,"composer":"Audioslave/Chris Cornell","milliseconds":279457,"bytes":6709793,"unit_price":0.99},{"track_id":86,"name":"Show Me How to Live","album_id":10,"media_type_id":1,"genre_id":1,"composer":"Audioslave/Chris Cornell","milliseconds":277890,"bytes":6672176,"unit_price":0.99},{"track_id":85,"name":"Cochise","album_id":10,"media_type_id":1,"genre_id":1,"composer":"Audioslave/Chris Cornell","milliseconds":222380,"bytes":5339931,"unit_price":0.99}]},
      {"id":11,"name":"Out Of Exile","vendor_id":8,"requires_shipping":false,"sku":"ALBUM-11","taxable":true,"status":"available","price":1390,"vendor":{"id":8,"name":"Audioslave"},"details":[{"track_id":110,"name":"The Curse","album_id":11,"media_type_id":1,"genre_id":4,"composer":"Cornell, Commerford, Morello, Wilk","milliseconds":309786,"bytes":10029406,"unit_price":0.99},{"track_id":109,"name":"#1 Zero","album_id":11,"media_type_id":1,"genre_id":4,"composer":"Cornell, Commerford, Morello, Wilk","milliseconds":299102,"bytes":9731988,"unit_price":0.99},{"track_id":108,"name":"Dandelion","album_id":11,"media_type_id":1,"genre_id":4,"composer":"Cornell, Commerford, Morello, Wilk","milliseconds":278125,"bytes":9003592,"unit_price":0.99},{"track_id":107,"name":"Yesterday To Tomorrow","album_id":11,"media_type_id":1,"genre_id":4,"composer":"Cornell, Commerford, Morello, Wilk","milliseconds":273763,"bytes":8944205,"unit_price":0.99},{"track_id":106,"name":"Man Or Animal","album_id":11,"media_type_id":1,"genre_id":4,"composer":"Cornell, Commerford, Morello, Wilk","milliseconds":233195,"bytes":7542942,"unit_price":0.99},{"track_id":105,"name":"The Worm","album_id":11,"media_type_id":1,"genre_id":4,"composer":"Cornell, Commerford, Morello, Wilk","milliseconds":237714,"bytes":7710800,"unit_price":0.99},{"track_id":104,"name":"Heaven's Dead","album_id":11,"media_type_id":1,"genre_id":4,"composer":"Cornell, Commerford, Morello, Wilk","milliseconds":276688,"bytes":9006158,"unit_price":0.99},{"track_id":103,"name":"Drown Me Slowly","album_id":11,"media_type_id":1,"genre_id":4,"composer":"Cornell, Commerford, Morello, Wilk","milliseconds":233691,"bytes":7609178,"unit_price":0.99},{"track_id":102,"name":"Doesn't Remind Me","album_id":11,"media_type_id":1,"genre_id":4,"composer":"Cornell, Commerford, Morello, Wilk","milliseconds":255869,"bytes":8357387,"unit_price":0.99},{"track_id":101,"name":"Be Yourself","album_id":11,"media_type_id":1,"genre_id":4,"composer":"Cornell, Commerford, Morello, Wilk","milliseconds":279484,"bytes":9106160,"unit_price":0.99},{"track_id":100,"name":"Out Of Exile","album_id":11,"media_type_id":1,"genre_id":4,"composer":"Cornell, Commerford, Morello, Wilk","milliseconds":291291,"bytes":9506571,"unit_price":0.99},{"track_id":99,"name":"Your Time Has Come","album_id":11,"media_type_id":1,"genre_id":4,"composer":"Cornell, Commerford, Morello, Wilk","milliseconds":255529,"bytes":8273592,"unit_price":0.99}]},
      {"id":12,"name":"BackBeat Soundtrack","vendor_id":9,"requires_shipping":false,"sku":"ALBUM-12","taxable":true,"status":"available","price":986,"vendor":{"id":9,"name":"BackBeat"},"details":[{"track_id":122,"name":"20 Flight Rock","album_id":12,"media_type_id":1,"genre_id":5,"composer":"Ned Fairchild","milliseconds":107807,"bytes":1299960,"unit_price":0.99},{"track_id":121,"name":"Good Golly Miss Molly","album_id":12,"media_type_id":1,"genre_id":5,"composer":"Little Richard","milliseconds":106266,"bytes":1704918,"unit_price":0.99},{"track_id":120,"name":"Carol","album_id":12,"media_type_id":1,"genre_id":5,"composer":"Chuck Berry","milliseconds":143830,"bytes":2306019,"unit_price":0.99},{"track_id":119,"name":"Roadrunner","album_id":12,"media_type_id":1,"genre_id":5,"composer":"Bo Diddley","milliseconds":143595,"bytes":2301989,"unit_price":0.99},{"track_id":118,"name":"Slow Down","album_id":12,"media_type_id":1,"genre_id":5,"composer":"Larry Williams","milliseconds":163265,"bytes":2616981,"unit_price":0.99},{"track_id":117,"name":"Rock 'N' Roll Music","album_id":12,"media_type_id":1,"genre_id":5,"composer":"Chuck Berry","milliseconds":141923,"bytes":2276788,"unit_price":0.99},{"track_id":116,"name":"C'Mon Everybody","album_id":12,"media_type_id":1,"genre_id":5,"composer":"Eddie Cochran/Jerry Capehart","milliseconds":140199,"bytes":2247846,"unit_price":0.99},{"track_id":115,"name":"Please Mr. Postman","album_id":12,"media_type_id":1,"genre_id":5,"composer":"Brian Holland/Freddie Gorman/Georgia Dobbins/Robert Bateman/William Garrett","milliseconds":137639,"bytes":2206986,"unit_price":0.99},{"track_id":114,"name":"Twist And Shout","album_id":12,"media_type_id":1,"genre_id":5,"composer":"Bert Russell/Phil Medley","milliseconds":161123,"bytes":2582553,"unit_price":0.99},{"track_id":113,"name":"Bad Boy","album_id":12,"media_type_id":1,"genre_id":5,"composer":"Larry Williams","milliseconds":116088,"bytes":1862126,"unit_price":0.99},{"track_id":112,"name":"Long Tall Sally","album_id":12,"media_type_id":1,"genre_id":5,"composer":"Enotris Johnson/Little Richard/Robert \"Bumps\" Blackwell","milliseconds":106396,"bytes":1707084,"unit_price":0.99},{"track_id":111,"name":"Money","album_id":12,"media_type_id":1,"genre_id":5,"composer":"Berry Gordy, Jr./Janie Bradford","milliseconds":147591,"bytes":2365897,"unit_price":0.99}]},
      {"id":13,"name":"The Best Of Billy Cobham","vendor_id":10,"requires_shipping":false,"sku":"ALBUM-13","taxable":true,"status":"available","price":1524,"vendor":{"id":10,"name":"Billy Cobham"},"details":[{"track_id":130,"name":"Do what cha wanna","album_id":13,"media_type_id":1,"genre_id":2,"composer":"George Duke","milliseconds":274155,"bytes":9018565,"unit_price":0.99},{"track_id":129,"name":"Solo-Panhandler","album_id":13,"media_type_id":1,"genre_id":2,"composer":"Billy Cobham","milliseconds":246151,"bytes":8230661,"unit_price":0.99},{"track_id":128,"name":"The pleasant pheasant","album_id":13,"media_type_id":1,"genre_id":2,"composer":"Billy Cobham","milliseconds":318066,"bytes":10630578,"unit_price":0.99},{"track_id":127,"name":"Stratus","album_id":13,"media_type_id":1,"genre_id":2,"composer":"Billy Cobham","milliseconds":582086,"bytes":19115680,"unit_price":0.99},{"track_id":126,"name":"Moon germs","album_id":13,"media_type_id":1,"genre_id":2,"composer":"Billy Cobham","milliseconds":294060,"bytes":9714812,"unit_price":0.99},{"track_id":125,"name":"Spanish moss-\"A sound portrait\"-Spanish moss","album_id":13,"media_type_id":1,"genre_id":2,"composer":"Billy Cobham","milliseconds":248084,"bytes":8217867,"unit_price":0.99},{"track_id":124,"name":"Snoopy's search-Red baron","album_id":13,"media_type_id":1,"genre_id":2,"composer":"Billy Cobham","milliseconds":456071,"bytes":15075616,"unit_price":0.99},{"track_id":123,"name":"Quadrant","album_id":13,"media_type_id":1,"genre_id":2,"composer":"Billy Cobham","milliseconds":261851,"bytes":8538199,"unit_price":0.99}]},
      {"id":14,"name":"Alcohol Fueled Brewtality Live! [Disc 1]","vendor_id":11,"requires_shipping":false,"sku":"ALBUM-14","taxable":true,"status":"available","price":1547,"vendor":{"id":11,"name":"Black Label Society"},"details":[{"track_id":143,"name":"The Begining... At Last","album_id":14,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":365662,"bytes":11965109,"unit_price":0.99},{"track_id":142,"name":"No More Tears","album_id":14,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":555075,"bytes":18041629,"unit_price":0.99},{"track_id":141,"name":"World Of Trouble","album_id":14,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":359157,"bytes":11820932,"unit_price":0.99},{"track_id":140,"name":"Born To Booze","album_id":14,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":282122,"bytes":9257358,"unit_price":0.99},{"track_id":139,"name":"A.N.D.R.O.T.A.Z.","album_id":14,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":266266,"bytes":8574746,"unit_price":0.99},{"track_id":138,"name":"Bored To Tears","album_id":14,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":247327,"bytes":8130090,"unit_price":0.99},{"track_id":137,"name":"Lost My Better Half","album_id":14,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":284081,"bytes":9355309,"unit_price":0.99},{"track_id":136,"name":"Phoney Smile Fake Hellos","album_id":14,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":273606,"bytes":9011701,"unit_price":0.99},{"track_id":135,"name":"Super Terrorizer","album_id":14,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":319373,"bytes":10513905,"unit_price":0.99},{"track_id":134,"name":"All For You","album_id":14,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":235833,"bytes":7726948,"unit_price":0.99},{"track_id":133,"name":"Stronger Than Death","album_id":14,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":300747,"bytes":9869647,"unit_price":0.99},{"track_id":132,"name":"13 Years Of Grief","album_id":14,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":246987,"bytes":8137421,"unit_price":0.99},{"track_id":131,"name":"Intro/ Low Down","album_id":14,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":323683,"bytes":10642901,"unit_price":0.99}]},
      {"id":15,"name":"Alcohol Fueled Brewtality Live! [Disc 2]","vendor_id":11,"requires_shipping":false,"sku":"ALBUM-15","taxable":true,"status":"available","price":1482,"vendor":{"id":11,"name":"Black Label Society"},"details":[{"track_id":148,"name":"The Beginning...At Last","album_id":15,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":271960,"bytes":8975814,"unit_price":0.99},{"track_id":147,"name":"Blood In The Wall","album_id":15,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":284368,"bytes":9359475,"unit_price":0.99},{"track_id":146,"name":"Like A Bird","album_id":15,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":276532,"bytes":9115657,"unit_price":0.99},{"track_id":145,"name":"Snowblind","album_id":15,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":420022,"bytes":13842549,"unit_price":0.99},{"track_id":144,"name":"Heart Of Gold","album_id":15,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":194873,"bytes":6417460,"unit_price":0.99}]},
      {"id":16,"name":"Black Sabbath","vendor_id":12,"requires_shipping":false,"sku":"ALBUM-16","taxable":true,"status":"available","price":960,"vendor":{"id":12,"name":"Black Sabbath"},"details":[{"track_id":155,"name":"Warning","album_id":16,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":212062,"bytes":6893363,"unit_price":0.99},{"track_id":154,"name":"Sleeping Village","album_id":16,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":644571,"bytes":21128525,"unit_price":0.99},{"track_id":153,"name":"Evil Woman","album_id":16,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":204930,"bytes":6655170,"unit_price":0.99},{"track_id":152,"name":"N.I.B.","album_id":16,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":368770,"bytes":12029390,"unit_price":0.99},{"track_id":151,"name":"Behind The Wall Of Sleep","album_id":16,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":217573,"bytes":7169049,"unit_price":0.99},{"track_id":150,"name":"The Wizard","album_id":16,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":264829,"bytes":8646737,"unit_price":0.99},{"track_id":149,"name":"Black Sabbath","album_id":16,"media_type_id":1,"genre_id":3,"composer":null,"milliseconds":382066,"bytes":12440200,"unit_price":0.99}]},
      {"id":17,"name":"Black Sabbath Vol. 4 (Remaster)","vendor_id":12,"requires_shipping":false,"sku":"ALBUM-17","taxable":true,"status":"available","price":1159,"vendor":{"id":12,"name":"Black Sabbath"},"details":[{"track_id":165,"name":"Under The Sun/Every Day Comes and Goes","album_id":17,"media_type_id":1,"genre_id":3,"composer":"Tony Iommi, Bill Ward, Geezer Butler, Ozzy Osbourne","milliseconds":350458,"bytes":11360486,"unit_price":0.99},{"track_id":164,"name":"St. Vitus Dance","album_id":17,"media_type_id":1,"genre_id":3,"composer":"Tony Iommi, Bill Ward, Geezer Butler, Ozzy Osbourne","milliseconds":149655,"bytes":4884969,"unit_price":0.99},{"track_id":163,"name":"Laguna Sunrise","album_id":17,"media_type_id":1,"genre_id":3,"composer":"Tony Iommi, Bill Ward, Geezer Butler, Ozzy Osbourne","milliseconds":173087,"bytes":5671374,"unit_price":0.99},{"track_id":162,"name":"Cornucopia","album_id":17,"media_type_id":1,"genre_id":3,"composer":"Tony Iommi, Bill Ward, Geezer Butler, Ozzy Osbourne","milliseconds":234814,"bytes":7653880,"unit_price":0.99},{"track_id":161,"name":"Snowblind","album_id":17,"media_type_id":1,"genre_id":3,"composer":"Tony Iommi, Bill Ward, Geezer Butler, Ozzy Osbourne","milliseconds":331676,"bytes":10813386,"unit_price":0.99},{"track_id":160,"name":"Supernaut","album_id":17,"media_type_id":1,"genre_id":3,"composer":"Tony Iommi, Bill Ward, Geezer Butler, Ozzy Osbourne","milliseconds":285779,"bytes":9245971,"unit_price":0.99},{"track_id":159,"name":"FX","album_id":17,"media_type_id":1,"genre_id":3,"composer":"Tony Iommi, Bill Ward, Geezer Butler, Ozzy Osbourne","milliseconds":103157,"bytes":3331776,"unit_price":0.99},{"track_id":158,"name":"Changes","album_id":17,"media_type_id":1,"genre_id":3,"composer":"Tony Iommi, Bill Ward, Geezer Butler, Ozzy Osbourne","milliseconds":286275,"bytes":9175517,"unit_price":0.99},{"track_id":157,"name":"Tomorrow's Dream","album_id":17,"media_type_id":1,"genre_id":3,"composer":"Tony Iommi, Bill Ward, Geezer Butler, Ozzy Osbourne","milliseconds":192496,"bytes":6252071,"unit_price":0.99},{"track_id":156,"name":"Wheels Of Confusion / The Straightener","album_id":17,"media_type_id":1,"genre_id":3,"composer":"Tony Iommi, Bill Ward, Geezer Butler, Ozzy Osbourne","milliseconds":494524,"bytes":16065830,"unit_price":0.99}]}
    ];
    private events = [
      {"timestamp":"2015-05-20T22:21:18.036Z","style":"WUSHU","action":"BLOCK","weapon":"CHAIR","target":"BODY","strength":4.7912},
      {"timestamp":"2015-05-20T22:21:19.247Z","style":"DRUNKEN_BOXING","action":"PUNCH","weapon":"BROAD_SWORD","target":"ARMS","strength":3.0248},
      {"timestamp":"2015-05-20T22:21:20.947Z","style":"DRUNKEN_BOXING","action":"BLOCK","weapon":"ROPE","target":"HEAD","strength":6.7571},
      {"timestamp":"2015-05-20T22:21:22.715Z","style":"WUSHU","action":"KICK","weapon":"BROAD_SWORD","target":"ARMS","strength":9.2062},
      {"timestamp":"2015-05-20T22:21:23.852Z","style":"KUNG_FU","action":"PUNCH","weapon":"BROAD_SWORD","target":"HEAD","strength":4.6202},
      {"timestamp":"2015-05-20T22:21:25.195Z","style":"KUNG_FU","action":"JUMP","weapon":"ROPE","target":"ARMS","strength":7.5303},
      {"timestamp":"2015-05-20T22:21:26.492Z","style":"DRUNKEN_BOXING","action":"PUNCH","weapon":"STAFF","target":"HEAD","strength":1.1247},
      {"timestamp":"2015-05-20T22:21:28.042Z","style":"WUSHU","action":"BLOCK","weapon":"STAFF","target":"ARMS","strength":5.5976},
      {"timestamp":"2015-05-20T22:21:29.422Z","style":"KUNG_FU","action":"BLOCK","weapon":"ROPE","target":"ARMS","strength":2.152},
      {"timestamp":"2015-05-20T22:21:30.782Z","style":"DRUNKEN_BOXING","action":"BLOCK","weapon":"STAFF","target":"ARMS","strength":6.2686},
      {"timestamp":"2015-05-20T22:21:32.128Z","style":"KUNG_FU","action":"KICK","weapon":"BROAD_SWORD","target":"BODY","strength":2.3534}
    ];
    private users = [
        {
          "_id": "5aaa0d8de72edc57a2ffa2a0",
          "index": 0,
          "guid": "5c4df3d6-88cc-4833-8577-cbcba31e5b72",
          "isActive": false,
          "balance": "$2,866.70",
          "picture": "https://image.flaticon.com/icons/png/128/145/145862.png",
          "age": 39,
          "eyeColor": "blue",
          "name": "Mathis Morales",
          "gender": "male",
          "company": "EURON",
          "email": "mathismorales@euron.com",
          "phone": "+1 (940) 531-2138",
          "address": {
            "street": "490 Imlay Street",
            "suite": "Apt. 556",
            "city": "Wyoming",
            "zipcode": "92998-3874"
          },
          "about": "Ad reprehenderit ullamco nulla magna tempor sit non ex tempor ut amet sint ipsum mollit. Veniam eiusmod duis velit do nostrud sit laborum non ex non qui ea tempor. Magna incididunt culpa irure eiusmod in ullamco ullamco ullamco Lorem. Excepteur in irure officia esse aliqua est sint pariatur. Velit esse eiusmod eiusmod duis commodo laboris.\r\n",
          "registered": "2016-03-10T01:01:20Z",
          "latitude": 46.916452,
          "longitude": -120.734994,
          "tags": [
            "incididunt",
            "laborum",
            "in",
            "sit",
            "mollit",
            "culpa",
            "ipsum"
          ],
          "friends": [
            {
              "id": 0,
              "name": "Duncan Stevens"
            },
            {
              "id": 1,
              "name": "Bonita Albert"
            },
            {
              "id": 2,
              "name": "Taylor Stone"
            }
          ],
          "greeting": "Hello, Mathis Morales! You have 7 unread messages.",
          "favoriteFruit": "strawberry"
        },
        {
          "_id": "5aaa0d8d3530dbc3b36190ea",
          "index": 1,
          "guid": "b3682f9a-8a81-474e-88a7-5c9be2a1cc8d",
          "isActive": false,
          "balance": "$2,070.14",
          "picture": "https://image.flaticon.com/icons/png/128/701/701997.png",
          "age": 34,
          "eyeColor": "green",
          "name": "Tonya Sweeney",
          "gender": "female",
          "company": "FIREWAX",
          "email": "tonyasweeney@firewax.com",
          "phone": "+1 (928) 563-2254",
          "address": {
            "street": "288 Shale Street",
            "suite": "Apt. 556",
            "city": "Wyoming",
            "zipcode": "92998-7398"
          },
          "about": "Lorem est duis adipisicing sit pariatur esse minim aliquip id est velit non cillum laborum. Dolor enim sit est ea elit non culpa laboris consectetur et id veniam laboris. Id sint qui ut occaecat laboris cillum dolor commodo pariatur velit qui. Irure est qui ullamco ipsum veniam ipsum voluptate Lorem fugiat ipsum cupidatat veniam commodo et. Id exercitation enim exercitation tempor adipisicing tempor veniam adipisicing nostrud qui.\r\n",
          "registered": "2015-04-11T01:01:20Z",
          "latitude": -65.434795,
          "longitude": -108.165752,
          "tags": [
            "est",
            "ad",
            "proident",
            "occaecat",
            "dolor",
            "aute",
            "exercitation"
          ],
          "friends": [
            {
              "id": 0,
              "name": "Cannon Wagner"
            },
            {
              "id": 1,
              "name": "Horne Holt"
            },
            {
              "id": 2,
              "name": "Carol Dillon"
            },
            {
              "id": 3,
              "name": "Powers Pitts"
            }
          ],
          "greeting": "Hello, Tonya Sweeney! You have 8 unread messages.",
          "favoriteFruit": "apple"
        },
        {
          "_id": "5aaa0d8deaa6c896d7a191f4",
          "index": 2,
          "guid": "6d8b932f-36a3-4f0c-8f48-b20cb23c8a53",
          "isActive": false,
          "balance": "$1,883.90",
          "picture": "https://image.flaticon.com/icons/png/128/145/145862.png",
          "age": 21,
          "eyeColor": "blue",
          "name": "Nguyen Hubbard",
          "gender": "male",
          "company": "HOMELUX",
          "email": "nguyenhubbard@homelux.com",
          "phone": "+1 (826) 465-3417",
          "address": {
            "street": "271 Barwell Terrace",
            "suite": "Apt. 556",
            "city": "Seymour",
            "zipcode": "92998-3641"
          },
          "about": "Velit id proident pariatur reprehenderit et officia Lorem in qui minim voluptate officia. Anim adipisicing mollit officia qui exercitation deserunt deserunt in. Est incididunt mollit do et eu ex eiusmod sunt quis aute. Aliqua ipsum dolore reprehenderit occaecat aute ea culpa qui consequat eu veniam id.\r\n",
          "registered": "2014-03-10T01:01:20Z",
          "latitude": -68.421096,
          "longitude": 153.822867,
          "tags": [
            "mollit",
            "ea",
            "cupidatat",
            "quis",
            "pariatur",
            "proident",
            "cillum"
          ],
          "friends": [
            {
              "id": 0,
              "name": "Watson Floyd"
            },
            {
              "id": 1,
              "name": "Mary Cotton"
            },
            {
              "id": 2,
              "name": "Dixie Mullins"
            }
          ],
          "greeting": "Hello, Nguyen Hubbard! You have 1 unread messages.",
          "favoriteFruit": "banana"
        },
        {
          "_id": "5aaa0d8d8907a727fe9909f6",
          "index": 3,
          "guid": "701134c1-82cd-4f24-a867-f896350643f9",
          "isActive": false,
          "balance": "$3,666.56",
          "picture": "https://image.flaticon.com/icons/png/128/701/701997.png",
          "age": 37,
          "eyeColor": "brown",
          "name": "Cecelia Hartman",
          "gender": "female",
          "company": "MOMENTIA",
          "email": "ceceliahartman@momentia.com",
          "phone": "+1 (937) 578-2156",
          "address": {
            "street": "548 Clymer Street",
            "suite": "Apt. 556",
            "city": "Loveland",
            "zipcode": "92998-3641"
          },
          "about": "Est voluptate ea occaecat officia excepteur do ut magna pariatur voluptate ullamco. Ad enim proident officia aliquip incididunt. Culpa tempor laborum adipisicing minim nisi Lorem duis culpa officia reprehenderit nostrud cupidatat elit commodo. Nostrud ea exercitation aliquip nisi id. Aute ullamco consectetur veniam ex ad id nisi nisi fugiat Lorem dolor sit consequat in. Magna aliquip minim ullamco consectetur ex duis dolore deserunt anim ipsum. Ipsum aliquip irure incididunt deserunt sint voluptate ea voluptate voluptate nulla pariatur pariatur.\r\n",
          "registered": "2016-06-16T01:01:20Z",
          "latitude": -56.348654,
          "longitude": 52.767967,
          "tags": [
            "est",
            "id",
            "ut",
            "sint",
            "cillum",
            "minim",
            "commodo"
          ],
          "friends": [
            {
              "id": 0,
              "name": "Yang Barrera"
            },
            {
              "id": 1,
              "name": "Rosella Lane"
            },
            {
              "id": 2,
              "name": "Doyle Welch"
            }
          ],
          "greeting": "Hello, Cecelia Hartman! You have 5 unread messages.",
          "favoriteFruit": "banana"
        },
        {
          "_id": "5aaa0d8dce9b34329be37614",
          "index": 4,
          "guid": "09af711e-26e4-4169-8e09-99bb7ef8d149",
          "isActive": true,
          "balance": "$2,665.18",
          "picture": "https://image.flaticon.com/icons/png/128/701/701997.png",
          "age": 28,
          "eyeColor": "green",
          "name": "Gilliam Walker",
          "gender": "male",
          "company": "AQUASSEUR",
          "email": "gilliamwalker@aquasseur.com",
          "phone": "+1 (909) 586-3974",
          "address": {
            "street": "811 Bond Street",
            "suite": "Apt. 556",
            "city": "Marienthal",
            "zipcode": "92998-5512"
          },
          "about": "Ex laboris dolor ut voluptate commodo consequat ad id et. Do magna do pariatur minim magna deserunt velit culpa cupidatat Lorem. Ea sunt nostrud cupidatat qui consectetur mollit ex dolor labore. Magna nostrud deserunt culpa voluptate est tempor duis esse ea ea. Do laborum do commodo amet sunt officia officia nulla consequat labore deserunt.\r\n",
          "registered": "2014-01-17T01:01:20Z",
          "latitude": -8.285576,
          "longitude": 65.712943,
          "tags": [
            "sint",
            "sit",
            "fugiat",
            "excepteur",
            "nulla",
            "velit",
            "velit"
          ],
          "friends": [
            {
              "id": 0,
              "name": "Margret Spence"
            },
            {
              "id": 1,
              "name": "Stacie Mann"
            },
            {
              "id": 2,
              "name": "Meyers Hansen"
            }
          ],
          "greeting": "Hello, Gilliam Walker! You have 8 unread messages.",
          "favoriteFruit": "strawberry"
        },
        {
          "_id": "5aaa0d8d276289980c471c92",
          "index": 5,
          "guid": "36913bf3-9b05-41ab-a274-d033866adf92",
          "isActive": true,
          "balance": "$3,698.24",
          "picture": "https://image.flaticon.com/icons/png/128/701/701997.png",
          "age": 39,
          "eyeColor": "brown",
          "name": "Bernard Downs",
          "gender": "male",
          "company": "PROSURE",
          "email": "bernarddowns@prosure.com",
          "phone": "+1 (850) 400-3183",
          "address": {
            "street": "351 Orange Street",
            "suite": "Apt. 556",
            "city": "Machias",
            "zipcode": "92998-5241"
          },
          "about": "Laborum ipsum nulla aute quis ad do qui id ex sint sit. Duis Lorem ea mollit dolor ipsum cupidatat ipsum elit veniam cupidatat eu culpa tempor est. Irure aute veniam laboris velit Lorem et do incididunt. Magna sunt ipsum pariatur commodo id ad sit ipsum aliqua proident aute culpa velit elit.\r\n",
          "registered": "2017-03-10T01:01:20Z",
          "latitude": -50.21133,
          "longitude": -165.969327,
          "tags": [
            "duis",
            "laboris",
            "dolor",
            "adipisicing",
            "mollit",
            "enim",
            "mollit"
          ],
          "friends": [
            {
              "id": 0,
              "name": "Hanson Henry"
            },
            {
              "id": 1,
              "name": "Beulah Hodge"
            },
            {
              "id": 2,
              "name": "Fay Trevino"
            }
          ],
          "greeting": "Hello, Bernard Downs! You have 4 unread messages.",
          "favoriteFruit": "banana"
        },
        {
          "_id": "5aaa0d8d4bbab672fea889bc",
          "index": 6,
          "guid": "a3ca7ac4-c798-40e4-acfa-e4a942c56efb",
          "isActive": false,
          "balance": "$2,351.14",
          "picture": "https://image.flaticon.com/icons/png/128/145/145862.png",
          "age": 28,
          "eyeColor": "brown",
          "name": "Cooke Sellers",
          "gender": "male",
          "company": "RETROTEX",
          "email": "cookesellers@retrotex.com",
          "phone": "+1 (837) 495-3455",
          "address": {
            "street": "375 Fountain Avenue",
            "suite": "Apt. 556",
            "city": "Forestburg",
            "zipcode": "92998-5996"
          },
          "about": "Est dolore Lorem anim quis proident. Magna sint ea proident laboris quis do reprehenderit laborum fugiat dolor cupidatat mollit veniam. Et id incididunt mollit ipsum sint aute. Velit sunt ea ullamco pariatur consequat cupidatat consequat. Non velit nostrud reprehenderit deserunt incididunt commodo.\r\n",
          "registered": "2018-01-10T01:01:20Z",
          "latitude": -62.206696,
          "longitude": -130.603082,
          "tags": [
            "eiusmod",
            "proident",
            "sit",
            "nulla",
            "qui",
            "ipsum",
            "elit"
          ],
          "friends": [
            {
              "id": 0,
              "name": "Payne Jimenez"
            },
            {
              "id": 1,
              "name": "Long Reilly"
            },
            {
              "id": 2,
              "name": "Nellie Richmond"
            }
          ],
          "greeting": "Hello, Cooke Sellers! You have 1 unread messages.",
          "favoriteFruit": "banana"
        },
        {
          "_id": "5aaa0d8d8bd2919a9de7fdae",
          "index": 7,
          "guid": "170dfa05-141f-4e7b-a462-f4a55b21d3d7",
          "isActive": true,
          "balance": "$3,562.47",
          "picture": "https://image.flaticon.com/icons/png/128/701/701997.png",
          "age": 32,
          "eyeColor": "blue",
          "name": "Lawrence Barnett",
          "gender": "male",
          "company": "OBLIQ",
          "email": "lawrencebarnett@obliq.com",
          "phone": "+1 (939) 507-3595",
          "address": {
            "street": "271 Lincoln Road",
            "suite": "Apt. 556",
            "city": "Cumberland",
            "zipcode": "92998-1969"
          },
          "about": "Consectetur ad minim fugiat sunt exercitation officia occaecat ut id. Eu dolor occaecat sint ad excepteur culpa pariatur voluptate do nisi duis tempor aliquip. Labore nisi excepteur Lorem veniam est adipisicing commodo ex culpa non sint. Sit voluptate enim nostrud esse irure sunt est ea ut velit laboris anim aliquip. Sunt sint nulla deserunt labore minim dolore anim culpa laboris est qui id. Amet magna pariatur et irure sunt reprehenderit id.\r\n",
          "registered": "2011-04-20T01:01:20Z",
          "latitude": 47.207648,
          "longitude": 17.595186,
          "tags": [
            "mollit",
            "ullamco",
            "adipisicing",
            "enim",
            "cillum",
            "aliqua",
            "reprehenderit"
          ],
          "friends": [
            {
              "id": 0,
              "name": "Castillo Parsons"
            },
            {
              "id": 1,
              "name": "Spence Steele"
            },
            {
              "id": 2,
              "name": "Nona Burnett"
            }
          ],
          "greeting": "Hello, Lawrence Barnett! You have 6 unread messages.",
          "favoriteFruit": "apple"
        },
        {
          "_id": "5aaa0d8d27ab2e871522318f",
          "index": 8,
          "guid": "e09ece86-d227-4c47-91ab-49481a6c6fa0",
          "isActive": false,
          "balance": "$3,756.37",
          "picture": "https://image.flaticon.com/icons/png/128/145/145862.png",
          "age": 36,
          "eyeColor": "brown",
          "name": "Jaime Woodard",
          "gender": "female",
          "company": "AUSTECH",
          "email": "jaimewoodard@austech.com",
          "phone": "+1 (986) 449-2054",
          "address": {
            "street": "271 Lincoln Road",
            "suite": "Apt. 556",
            "city": "Cumberland",
            "zipcode": "92998-1969"
          },
          "about": "Culpa est nostrud non anim qui exercitation ullamco magna anim fugiat consectetur Lorem sunt qui. Minim non reprehenderit eu sunt sunt enim fugiat laboris id adipisicing. Do minim labore sunt laborum duis in sint occaecat exercitation dolore aliquip elit irure eu. Adipisicing velit ea et veniam proident et pariatur. Ad sunt enim aliqua eu sint duis commodo.\r\n",
          "registered": "2017-05-10T01:01:20Z",
          "latitude": -71.476505,
          "longitude": 14.61685,
          "tags": [
            "velit",
            "deserunt",
            "proident",
            "non",
            "deserunt",
            "voluptate",
            "laboris"
          ],
          "friends": [
            {
              "id": 0,
              "name": "Alexandria Shaw"
            },
            {
              "id": 1,
              "name": "Leach Rhodes"
            },
            {
              "id": 2,
              "name": "Lisa Dorsey"
            }
          ],
          "greeting": "Hello, Jaime Woodard! You have 6 unread messages.",
          "favoriteFruit": "strawberry"
        },
        {
          "_id": "5aaa0d8da1df0afbe903ae1b",
          "index": 9,
          "guid": "36c27f54-bc3a-4280-903f-a79c9503a8e2",
          "isActive": true,
          "balance": "$2,819.61",
          "picture": "https://image.flaticon.com/icons/png/128/145/145862.png",
          "age": 28,
          "eyeColor": "blue",
          "name": "Wilcox Becker",
          "gender": "male",
          "company": "GONKLE",
          "email": "wilcoxbecker@gonkle.com",
          "phone": "+1 (922) 506-2399",
          "address": {
            "street": "271 Lincoln Road",
            "suite": "Apt. 556",
            "city": "Cumberland",
            "zipcode": "92998-1969"
          },
          "about": "Adipisicing deserunt excepteur nostrud non incididunt nulla adipisicing velit incididunt incididunt elit culpa exercitation. Commodo Lorem eiusmod laborum amet Lorem proident incididunt dolor aliqua incididunt eu. Non amet proident minim elit sit Lorem voluptate cupidatat aute. Labore esse ipsum mollit eu quis enim labore aute. Excepteur reprehenderit exercitation esse aliquip. Elit velit dolore amet sunt.\r\n",
          "registered": "2018-02-11T01:01:20Z",
          "latitude": -26.572511,
          "longitude": 169.488811,
          "tags": [
            "et",
            "velit",
            "do",
            "reprehenderit",
            "labore",
            "laborum",
            "laboris"
          ],
          "friends": [
            {
              "id": 0,
              "name": "Branch Patel"
            },
            {
              "id": 1,
              "name": "Imogene Palmer"
            },
            {
              "id": 2,
              "name": "Mckenzie Mcconnell"
            }
          ],
          "greeting": "Hello, Wilcox Becker! You have 2 unread messages.",
          "favoriteFruit": "apple"
        },
        {
          "_id": "5aaa0d8de92a65a8eff0692b",
          "index": 10,
          "guid": "1064823b-bb77-4945-8bce-b37e085c6ce8",
          "isActive": false,
          "balance": "$3,981.63",
          "picture": "https://image.flaticon.com/icons/png/128/145/145862.png",
          "age": 30,
          "eyeColor": "brown",
          "name": "Concepcion Mcpherson",
          "gender": "female",
          "company": "WAAB",
          "email": "concepcionmcpherson@waab.com",
          "phone": "+1 (916) 529-2785",
          "address": {
            "street": "288 Shale Street",
            "suite": "Apt. 556",
            "city": "Wyoming",
            "zipcode": "92998-7398"
          },
          "about": "Quis aliquip veniam velit duis. Eiusmod id amet laborum do tempor tempor. Cupidatat consequat culpa cupidatat nisi dolor non duis nisi sint occaecat laboris. Magna eu amet aliquip occaecat qui. Enim laborum veniam pariatur incididunt in fugiat proident enim fugiat.\r\n",
          "registered": "2011-05-01T01:01:20Z",
          "latitude": -6.967468,
          "longitude": -48.045961,
          "tags": [
            "eu",
            "anim",
            "est",
            "tempor",
            "proident",
            "sunt",
            "voluptate"
          ],
          "friends": [
            {
              "id": 0,
              "name": "Patti Mckay"
            },
            {
              "id": 1,
              "name": "Carlene Barry"
            },
            {
              "id": 2,
              "name": "Black Bruce"
            }
          ],
          "greeting": "Hello, Concepcion Mcpherson! You have 8 unread messages.",
          "favoriteFruit": "apple"
        },
        {
          "_id": "5aaa0d8ddd09ce4ca3fb8182",
          "index": 11,
          "guid": "4c9bd812-dd98-4dfa-8751-3bc696a3f54b",
          "isActive": false,
          "balance": "$3,524.69",
          "picture": "https://image.flaticon.com/icons/png/128/145/145862.png",
          "age": 31,
          "eyeColor": "brown",
          "name": "Maxine Bridges",
          "gender": "female",
          "company": "KNOWLYSIS",
          "email": "maxinebridges@knowlysis.com",
          "phone": "+1 (955) 445-3426",
          "address": {
            "street": "886 McKibbin Street",
            "suite": "Apt. 556",
            "city": "WBuxtonyoming",
            "zipcode": "92998-9280"
          },
          "about": "Eu irure do ad aliquip mollit ullamco esse adipisicing commodo. Sit aliquip reprehenderit pariatur commodo aliqua incididunt consequat aliqua occaecat dolor ipsum anim mollit. Ipsum ad qui minim ex qui nostrud eu ad id nulla mollit consequat fugiat reprehenderit. Dolore ea culpa qui occaecat quis ad. Quis minim mollit mollit do sunt officia. Cupidatat commodo in esse laborum cillum veniam ad esse incididunt. Mollit incididunt culpa sunt aute do.\r\n",
          "registered": "2016-06-10T01:01:20Z",
          "latitude": -87.070432,
          "longitude": 72.863521,
          "tags": [
            "ea",
            "Lorem",
            "culpa",
            "aliqua",
            "irure",
            "reprehenderit",
            "non"
          ],
          "friends": [
            {
              "id": 0,
              "name": "Maritza Harris"
            },
            {
              "id": 1,
              "name": "Jenkins Tanner"
            },
            {
              "id": 2,
              "name": "Carey Barton"
            }
          ],
          "greeting": "Hello, Maxine Bridges! You have 2 unread messages.",
          "favoriteFruit": "apple"
        },
        {
          "_id": "5aaa0d8d7a7a8292d0def9ff",
          "index": 12,
          "guid": "2a72dbbd-e543-400f-894d-8b63172517a9",
          "isActive": false,
          "balance": "$2,089.46",
          "picture": "https://image.flaticon.com/icons/png/128/145/145862.png",
          "age": 34,
          "eyeColor": "green",
          "name": "Craig Gibson",
          "gender": "male",
          "company": "UNCORP",
          "email": "craiggibson@uncorp.com",
          "phone": "+1 (829) 513-2318",
          "address": {
            "street": "455 Lincoln Avenue",
            "suite": "Apt. 556",
            "city": "Iberia",
            "zipcode": "92998-7860"
          },
          "about": "Sunt aute esse dolore ea adipisicing dolor et amet commodo culpa fugiat cillum occaecat nisi. Eu officia eiusmod et sint veniam tempor irure labore ipsum sit. Esse velit minim voluptate sunt esse exercitation exercitation adipisicing. Cupidatat commodo pariatur tempor aliqua enim eu aliqua.\r\n",
          "registered": "2011-01-18T01:01:20Z",
          "latitude": 10.450444,
          "longitude": 169.33071,
          "tags": [
            "ex",
            "ut",
            "sit",
            "qui",
            "elit",
            "veniam",
            "reprehenderit"
          ],
          "friends": [
            {
              "id": 0,
              "name": "Neal Gaines"
            },
            {
              "id": 1,
              "name": "Robbins Sandoval"
            },
            {
              "id": 2,
              "name": "Aisha Knight"
            }
          ],
          "greeting": "Hello, Craig Gibson! You have 9 unread messages.",
          "favoriteFruit": "banana"
        },
        {
          "_id": "5aaa0d8dd9302d80f18c1e10",
          "index": 13,
          "guid": "5f1bddac-19a6-47fa-ba25-6b38b87c8f50",
          "isActive": false,
          "balance": "$1,000.51",
          "picture": "https://image.flaticon.com/icons/png/128/145/145862.png",
          "age": 20,
          "eyeColor": "blue",
          "name": "Gould Holmes",
          "gender": "male",
          "company": "BALUBA",
          "email": "gouldholmes@baluba.com",
          "phone": "+1 (860) 452-2739",
          "address": {
            "street": "455 Lincoln Avenue",
            "suite": "Apt. 556",
            "city": "Iberia",
            "zipcode": "92998-7860"
          },
          "about": "Esse tempor ea magna irure. Lorem ullamco aliquip labore qui et quis culpa nostrud. Ex aliqua culpa culpa fugiat mollit id eiusmod. Velit ut nisi laboris non magna amet ipsum non irure. Nostrud nostrud sint consequat pariatur labore occaecat aute nulla adipisicing aliqua ut. Sint irure quis dolore ipsum quis nisi. Id velit aliqua officia elit aliquip mollit nulla eiusmod aute eu do laborum.\r\n",
          "registered": "2018-02-10T01:01:20Z",
          "latitude": 17.539471,
          "longitude": 71.124751,
          "tags": [
            "voluptate",
            "id",
            "ex",
            "elit",
            "esse",
            "quis",
            "quis"
          ],
          "friends": [
            {
              "id": 0,
              "name": "Florine Zamora"
            },
            {
              "id": 1,
              "name": "Terrell Daniel"
            },
            {
              "id": 2,
              "name": "Meredith Phelps"
            }
          ],
          "greeting": "Hello, Gould Holmes! You have 4 unread messages.",
          "favoriteFruit": "strawberry"
        },
        {
          "_id": "5aaa0d8d1995a9d1cb81de78",
          "index": 14,
          "guid": "929950e8-1b7e-49fd-9166-a22e1b013eae",
          "isActive": false,
          "balance": "$3,977.01",
          "picture": "https://image.flaticon.com/icons/png/128/145/145862.png",
          "age": 40,
          "eyeColor": "green",
          "name": "Downs Kent",
          "gender": "male",
          "company": "ANDERSHUN",
          "email": "downskent@andershun.com",
          "phone": "+1 (917) 525-3943",
          "address": {
            "street": "455 Lincoln Avenue",
            "suite": "Apt. 556",
            "city": "Iberia",
            "zipcode": "92998-7860"
          },
          "about": "Aute ipsum reprehenderit elit occaecat qui culpa aute nisi tempor reprehenderit eiusmod culpa Lorem ullamco. Deserunt excepteur laborum ullamco tempor qui nostrud esse excepteur. Minim reprehenderit veniam aliqua enim laboris. Elit magna mollit fugiat laboris fugiat nulla deserunt dolor duis. Sit dolor incididunt adipisicing deserunt eu veniam sunt elit occaecat ea.\r\n",
          "registered": "2013-03-18T01:01:20Z",
          "latitude": -27.25604,
          "longitude": -43.099059,
          "tags": [
            "irure",
            "velit",
            "est",
            "officia",
            "culpa",
            "voluptate",
            "do"
          ],
          "friends": [
            {
              "id": 0,
              "name": "Araceli Buckner"
            },
            {
              "id": 1,
              "name": "Cruz Estes"
            },
            {
              "id": 2,
              "name": "Jarvis Cooper"
            }
          ],
          "greeting": "Hello, Downs Kent! You have 3 unread messages.",
          "favoriteFruit": "strawberry"
        },
        {
          "_id": "5aaa0d8d405ccbedbddc2908",
          "index": 15,
          "guid": "5f8316b5-bb86-4323-a1c9-fd0ef87b0550",
          "isActive": false,
          "balance": "$2,852.33",
          "picture": "https://image.flaticon.com/icons/png/128/145/145862.png",
          "age": 31,
          "eyeColor": "blue",
          "name": "Ramos England",
          "gender": "male",
          "company": "BIOSPAN",
          "email": "ramosengland@biospan.com",
          "phone": "+1 (883) 524-3172",
          "address": {
            "street": "105 Taaffe Place",
            "suite": "Apt. 556",
            "city": "Wollochet",
            "zipcode": "92998-5679"
          },
          "about": "Occaecat officia eu qui quis dolor magna et occaecat amet proident Lorem ut tempor. Aliqua magna ea reprehenderit laborum pariatur pariatur magna aute in. Aute aliquip duis adipisicing mollit in officia adipisicing labore. Labore amet in dolor elit tempor et aliquip Lorem reprehenderit. Cillum incididunt dolore irure fugiat pariatur laborum culpa. Laboris voluptate tempor dolor aute nulla dolor proident consequat nisi. Ad ad id dolore cupidatat aliqua aliqua occaecat.\r\n",
          "registered": "2003-03-10T01:01:20Z",
          "latitude": 22.545507,
          "longitude": -131.560084,
          "tags": [
            "ut",
            "nisi",
            "adipisicing",
            "sit",
            "esse",
            "nostrud",
            "minim"
          ],
          "friends": [
            {
              "id": 0,
              "name": "Ball Campbell"
            },
            {
              "id": 1,
              "name": "Baker Carney"
            },
            {
              "id": 2,
              "name": "Powers Pitts"
            }
          ],
          "greeting": "Hello, Ramos England! You have 5 unread messages.",
          "favoriteFruit": "apple"
        }
      ];

    usersList() {
        // return this.http.get('https://jsonplaceholder.typicode.com/users/');
        return Observable.of(this.users);
    }
    eventsList() {
      // 'http://acesinc.net/introducing-a-streaming-json-data-generator/'
      return Observable.of(this.events);
  }
  productsList() {
    // 'http://acesinc.net/introducing-a-streaming-json-data-generator/'
    return Observable.of(this.products);
}

}
