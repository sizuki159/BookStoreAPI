import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Levels from 'App/Enums/Levels'
import Roles from 'App/Enums/Roles'
import User from 'App/Models/User'

export default class extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        await User.createMany([
            {
                email: 'admin@gmail.com',
                password: '12345',
                userRoleId: Roles.ADMIN,
                userLevelId: Levels.SILVER,
                isEmailVerified: true,
            },
            {
                email: 'starhonkai2001@gmail.com',
                password: '12345',
                userRoleId: Roles.USER,
                userLevelId: Levels.BASIC,
            },
        ])


        // Data Faker
        await User.createMany([
            {
                "id": 3,
                "email": "lehatri@gmail.com",
                "password": "hJBOK3gi1k14JUm_nYJS",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 4,
                "email": "nguyennuong@outlook.com",
                "password": "Za1JlrsX6ZzfsC8yYsbY",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 5,
                "email": "tranvancan@gmail.com",
                "password": "yniPpVX82qOAgY6I1Fd9",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 6,
                "email": "donuviet@gmail.com",
                "password": "IonnkB8Fpl6iKfll3QHg",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 7,
                "email": "dovannghia@gmail.com",
                "password": "XIfOTXIWG4DeyUpOi-LH",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 8,
                "email": "lyvanan@gmail.com",
                "password": "ugOX-A3A81Ajnks9CUFb",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 9,
                "email": "truonghuytri@outlook.com",
                "password": "882_aal5k0EQhaqnK-S9",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 10,
                "email": "dangvanhung@outlook.com",
                "password": "2tgYIX1_0YpMgiDzb3Dd",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 11,
                "email": "lyhabi@gmail.com",
                "password": "k8JYrdldGlxzBhD4DLAl",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 12,
                "email": "dangnukien@gmail.com",
                "password": "ITblgsRVI1r934jKkOO1",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 13,
                "email": "duongnumuc@gmail.com",
                "password": "Ym_iaqeI3jhCKNFIPhuj",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 14,
                "email": "tranminhlai@outlook.com",
                "password": "zkN6NPLbJRegNvhJO8SM",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 15,
                "email": "dongtieneo@gmail.com",
                "password": "piN_Qa2Kxrnq_jVgl1w_",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 16,
                "email": "daominhcat@gmail.com",
                "password": "zW8_rYZ18BF9RIdMj8lg",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 17,
                "email": "dangvancung@outlook.com",
                "password": "6R_Drliaf_DrnwqGpPhG",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 18,
                "email": "buiminhthoi@outlook.com",
                "password": "S8CDqKdA07UZvKHon3zC",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 19,
                "email": "phanquangtuyen@outlook.com",
                "password": "E4yuCjNgE6fjWc0DBSnU",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 20,
                "email": "buiminhkieu@outlook.com",
                "password": "pc8rUEt90bT2VZbVQ8kt",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 21,
                "email": "dominhthiet@gmail.com",
                "password": "-3AN9EBpz0u5yrm47Ce7",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 22,
                "email": "tranhuyphu@gmail.com",
                "password": "QWI27Zk28CDbFQwhyiMe",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 23,
                "email": "doandieuchiem@gmail.com",
                "password": "aMqaNO_ISEQppHSU1OE0",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 24,
                "email": "lexuantri@outlook.com",
                "password": "zXuaB1VU-Z2Mb8sDeBDN",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 25,
                "email": "huaquangtao@gmail.com",
                "password": "fjk-Xux9MP6Rq9a-cAD_",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 26,
                "email": "ngovantuong@outlook.com",
                "password": "m4b9-R5Ka9XEs-W2OVZI",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 27,
                "email": "nguyenhuychim@outlook.com",
                "password": "_cgNV5LMeyR2jU0P0QwV",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 28,
                "email": "dohanghia@gmail.com",
                "password": "PBnBinJzmN2a7d1_Y15C",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 29,
                "email": "ngominhluong@gmail.com",
                "password": "ZWCHOIJEYOOfn7vvDkys",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 30,
                "email": "huatienteo@outlook.com",
                "password": "Ki5g59yjdRVoi22Xpf9r",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 31,
                "email": "daotienon@outlook.com",
                "password": "2u2cHSEEArLtGYb0JM-R",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 32,
                "email": "huynhnuquac@gmail.com",
                "password": "MeCWH8PKQbjEYbnFQNvj",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 33,
                "email": "vuvancang@gmail.com",
                "password": "vq53jzOozkOiqyzJ3kxn",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 34,
                "email": "daohuylu@gmail.com",
                "password": "KEsVtfmUyzVvGxl5pxj9",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 35,
                "email": "phithiquyen@outlook.com",
                "password": "lfMT2GEcNoooHBpyDJ0G",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 36,
                "email": "lyvanho@outlook.com",
                "password": "E9FcHMZkN9dF7sY0fjBx",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 37,
                "email": "doandieuquan@gmail.com",
                "password": "qZr8wulU022j8hOLzqLh",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 38,
                "email": "huynhquangguong@gmail.com",
                "password": "G04wBvegKyevYDBOHgC5",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 39,
                "email": "doanquangchim@gmail.com",
                "password": "AIvUQqUXrWAdW-lpcr5W",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 40,
                "email": "daohapham@outlook.com",
                "password": "HCnXPtJDUKtp2m6s3iTk",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 41,
                "email": "vuminhson@outlook.com",
                "password": "3nBPxwfk1kyRKFF-UZd9",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 42,
                "email": "dangnubien@gmail.com",
                "password": "Y8c5jTe9dsElvAVNXdR0",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 43,
                "email": "lyhakhuu@outlook.com",
                "password": "KFsmo_QWnhfnBihOxIzj",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 44,
                "email": "dangdieudanh@gmail.com",
                "password": "dYW0FdUuhcG_Mdhc4hz2",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 45,
                "email": "tranvancoc@outlook.com",
                "password": "2yr4STxSdm11blVzM0Eq",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 46,
                "email": "hohahau@gmail.com",
                "password": "zFYNkibOq32udi1KxLle",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 47,
                "email": "buihatuong@gmail.com",
                "password": "YzCF3Vbtp1-Ae_TZH5X-",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 48,
                "email": "hohagiao@gmail.com",
                "password": "THAnv4gvIrgfAMT8hzkk",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 49,
                "email": "lynuhai@gmail.com",
                "password": "1C2-42YCzj_GU1Lyo1Ga",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 50,
                "email": "doanminhkhieu@outlook.com",
                "password": "328lt72iZRrA7JbvBu8Z",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 51,
                "email": "letienai@outlook.com",
                "password": "1mMZMyPHcHDTCKmrOwen",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 52,
                "email": "dongthidanh@outlook.com",
                "password": "9CyixSQpl9Z8Cw0gbJ67",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 53,
                "email": "doannutrung@outlook.com",
                "password": "MwApsmg8ck4i1zfoU1A-",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 54,
                "email": "buihakhien@gmail.com",
                "password": "43fT7tBLArlfdTwcQ5tL",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 55,
                "email": "tranminhkha@outlook.com",
                "password": "iObYir1gcOm0wzkRSprc",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 56,
                "email": "leminhvi@outlook.com",
                "password": "ORO9aFdqEt2nS3pzzYwL",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 57,
                "email": "trinhhamuc@outlook.com",
                "password": "pLDWdHWpcEUVj2yhvxnh",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 58,
                "email": "dothicanh@outlook.com",
                "password": "2DOC6J0DEW8ApkJAk4cT",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 59,
                "email": "huavantuyen@gmail.com",
                "password": "nsReFG6F1hogcYU50dgP",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 60,
                "email": "ngohahoai@outlook.com",
                "password": "G3MD5fHJ4Ngvc5EesLih",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 61,
                "email": "lyxuankhien@gmail.com",
                "password": "f658o4lEXw1hnjzCBMG-",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 62,
                "email": "trinhtienao@outlook.com",
                "password": "5ZB5FPVikR13-Mqrx9lg",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 63,
                "email": "huathihao@outlook.com",
                "password": "Ow5phJnhOY13yBrtfsnP",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 64,
                "email": "danghavan@outlook.com",
                "password": "CIIfWz_Fr7RPSaTsfUaZ",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 65,
                "email": "phixuanlu@outlook.com",
                "password": "JoFQAwe0vdKw6fmiqgop",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 66,
                "email": "dongthinham@outlook.com",
                "password": "L6WImEyNs-lJwpAmchlQ",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 67,
                "email": "hovanham@gmail.com",
                "password": "mErydKuEBrtZJ9pn5wg_",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 68,
                "email": "duongquangba@gmail.com",
                "password": "dQ6cuydfEnrMtldOj1in",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 69,
                "email": "trinhquangbe@gmail.com",
                "password": "LUVkhXCV-49twzXVSchJ",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 70,
                "email": "phamminhcam@outlook.com",
                "password": "UIwdWRdvv-ynax-sUHFU",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 71,
                "email": "duongthinguy@outlook.com",
                "password": "407XTImeadO7Lk3KXnAN",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 72,
                "email": "vuxuanmao@outlook.com",
                "password": "agnzYhLv0ORyHWqVo43L",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 73,
                "email": "dongxuanvan@outlook.com",
                "password": "Aj_2a3cEIbk6RTSDNEvZ",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 74,
                "email": "lydieuiep@outlook.com",
                "password": "jIfxAL7XsMt4U3K2lbOD",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 75,
                "email": "duongnulo@outlook.com",
                "password": "8TQNooiPWHkpFsIIF9ls",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 76,
                "email": "huynhnuluc@gmail.com",
                "password": "NY67QDosnO_FSysifyf-",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 77,
                "email": "dangdieutang@gmail.com",
                "password": "_TA_hXvYAJDhssolEU7c",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 78,
                "email": "phivanlang@outlook.com",
                "password": "KftVtnLZTUEZzabWAQmM",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 79,
                "email": "hothiac@outlook.com",
                "password": "WlskhMUNzDX9ZLktTDbg",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 80,
                "email": "hohaba@outlook.com",
                "password": "TYYErQeWhiMBkJSB9WoQ",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 81,
                "email": "ngohuytha@gmail.com",
                "password": "TifNckEJvjIxkzd6igKm",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 82,
                "email": "trinhdieuuyen@outlook.com",
                "password": "hXD6VWQO9tJFb4aqDuwx",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 83,
                "email": "lehuycao@outlook.com",
                "password": "d6VFMeTus0N7OkBZ43IU",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 84,
                "email": "phinuche@gmail.com",
                "password": "VEblNKqyJ3vnIem9pUAY",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 85,
                "email": "phamnubien@gmail.com",
                "password": "kw6XnUP8EnCosBhIyyis",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 86,
                "email": "truongthininh@outlook.com",
                "password": "2dBrmsTNVXaz5GUAxW0s",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 87,
                "email": "hovangiap@outlook.com",
                "password": "47g41oOBaCedWDQEd2S-",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 88,
                "email": "doxuanthanh@outlook.com",
                "password": "UtsHPLfwgcyM-rpjOvQV",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 89,
                "email": "vuxuanbi@outlook.com",
                "password": "p7UshM6eNdicFCZgDPuk",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 90,
                "email": "nguyentienmang@outlook.com",
                "password": "9HLxflRYygFpLxhoUSxp",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 91,
                "email": "trinhnunong@outlook.com",
                "password": "z8sTXHn3WL44mKa8aLxS",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 92,
                "email": "daothiliem@outlook.com",
                "password": "Y1HgMo4Jy9DoI-U9xuTe",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 93,
                "email": "huynhtienkheo@outlook.com",
                "password": "Mh2h-zfVYpnd9WWRQGuT",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 94,
                "email": "daohaluu@outlook.com",
                "password": "Iunnq4QXRs2tvhizE-l9",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 95,
                "email": "hominhhui@gmail.com",
                "password": "JkOUBbpypxexmlY9-Tlf",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 96,
                "email": "phandieuvan@gmail.com",
                "password": "dR51mvWDcm35lAVmH4sV",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 97,
                "email": "buihuylinh@gmail.com",
                "password": "BzqsEYm0RwpQk_4ZU8Rm",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 98,
                "email": "duongvankheo@gmail.com",
                "password": "FuSU641gyoEvAYVj5zD_",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 99,
                "email": "nguyenxuanbu@outlook.com",
                "password": "QazAlBsZeRNYr2-ygxyz",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 100,
                "email": "huynhminhtram@outlook.com",
                "password": "8mo-YWo9VqxkWWZrgEgp",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 101,
                "email": "phamminhphan@gmail.com",
                "password": "IZcFukiBpDeSff1eOyKr",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 102,
                "email": "doquangdi@gmail.com",
                "password": "lHIwSPdSIgUqN8-NKE2K",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 103,
                "email": "tranvancanh@outlook.com",
                "password": "oGH4JeTpT4i_jPP_XJXF",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 104,
                "email": "phanxuanxuan@gmail.com",
                "password": "GZMTyNhghQkPNJEt-sQg",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 105,
                "email": "phidieuon@gmail.com",
                "password": "UJpf-81DkrvC1XcVlqT8",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 106,
                "email": "huaminhvong@outlook.com",
                "password": "YRl6wM3S_EBJvjzm8wjV",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 107,
                "email": "ngothinghiem@gmail.com",
                "password": "Maj1i21DJKFQfK80JE4V",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 108,
                "email": "huynhhuysam@outlook.com",
                "password": "ZlpEVEtUoInMUT8X5TkV",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 109,
                "email": "daodieucanh@outlook.com",
                "password": "-Mj6LQCE8zk1BmHr1ZrF",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 110,
                "email": "dangtienhinh@gmail.com",
                "password": "kTgluzWZTiGzl0aXx6vZ",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 111,
                "email": "duongquangtang@outlook.com",
                "password": "XZk9baZSkCitw8Anq_2T",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 112,
                "email": "phanminhxa@gmail.com",
                "password": "MIehjG-KpJWHUNankvsM",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 113,
                "email": "donghahung@outlook.com",
                "password": "5MpOHr5UksB48DDo3xSh",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 114,
                "email": "doanthilo@outlook.com",
                "password": "Jv2GRUSm_MFleHx9O8h_",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 115,
                "email": "hoquanghui@outlook.com",
                "password": "C55_jYl9N8qRr8bpYCT8",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 116,
                "email": "hohacanh@gmail.com",
                "password": "UpnMZUBQfuO9G7aSOXDB",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 117,
                "email": "donghakham@gmail.com",
                "password": "8xTuzho_q_6ESTV56eK2",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 118,
                "email": "truongnuduy@gmail.com",
                "password": "jU-b13T5z8cvpyYRpJXB",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 119,
                "email": "trantienhuy@gmail.com",
                "password": "dKjMM35s-8pcznQuBWCa",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 120,
                "email": "dangthican@outlook.com",
                "password": "z9abY3lALzwgCoyhMUYg",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 121,
                "email": "phixuanluc@gmail.com",
                "password": "e-PqT0FKhQzvI4VEBtX_",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 122,
                "email": "buinukhuu@gmail.com",
                "password": "cDvU4W6RTMzUNmYKXDta",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 123,
                "email": "phitieninh@gmail.com",
                "password": "VvJh_zugYGmHSDDQ-50I",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 124,
                "email": "doquangto@outlook.com",
                "password": "0X9gUY_zyiAOd5zQWvpW",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 125,
                "email": "dohakieu@gmail.com",
                "password": "277pOB7cjtCc1DWy8ZrP",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 126,
                "email": "truonghakhuong@outlook.com",
                "password": "IURRHSSvVh_GFbG0NWl2",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 127,
                "email": "hominhthach@gmail.com",
                "password": "Vvjvz92haurUsDvNsBav",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 128,
                "email": "phamnuphan@gmail.com",
                "password": "u20xfEMrC_FTXjdjw5fM",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 129,
                "email": "phitienphung@outlook.com",
                "password": "Zl6MqT_s6CEpiFs6QNmg",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 130,
                "email": "phanquangta@gmail.com",
                "password": "eJAB4QXrOO72Frqgo-B2",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 131,
                "email": "phanhanga@outlook.com",
                "password": "zHP5nRcY5qnVYA7N-I8T",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 132,
                "email": "tranvanoi@gmail.com",
                "password": "NsY7SU-6dTm-v2yPTLoA",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 133,
                "email": "lethicai@outlook.com",
                "password": "m21tlETHFKBhx3LgR0dh",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 134,
                "email": "duongquangsam@gmail.com",
                "password": "zdqahs0ppjXhMA-jtK5V",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 135,
                "email": "doanhuytac@outlook.com",
                "password": "4Yo6bhSCRsp2UL50xzUO",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 136,
                "email": "hominhmao@outlook.com",
                "password": "q6qTeoacu3-DyqGVk1Q5",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 137,
                "email": "ngotienquyen@gmail.com",
                "password": "usikYUNEhSRZgH9aEU0O",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 138,
                "email": "phihuybuu@gmail.com",
                "password": "fcC1NfNoNV9BTS_R4AU3",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 139,
                "email": "duongquangnha@outlook.com",
                "password": "rFMaQimWFIL45S731r6r",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 140,
                "email": "vudieutao@gmail.com",
                "password": "Nyy1ilymC7eqJMXfftUs",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 141,
                "email": "huavanhan@outlook.com",
                "password": "A78g88cEb1QMrKeT-Ddx",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 142,
                "email": "daohatuong@gmail.com",
                "password": "wXN5q_xVl8UCsS2cIpiL",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 143,
                "email": "huynhnuky@gmail.com",
                "password": "WaRMsn8u9JkIedefoT3A",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 144,
                "email": "trinhthimui@outlook.com",
                "password": "PdtbjiYiO9VQjKwVklLK",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 145,
                "email": "ngothicao@outlook.com",
                "password": "JpSGAgYcQJvS12S-BbE0",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 146,
                "email": "vuthituyen@gmail.com",
                "password": "088EP3AuexAewdoUqKvl",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 147,
                "email": "ledieuchau@gmail.com",
                "password": "uSyKG954RQuVIp8u12w4",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 148,
                "email": "hominhho@outlook.com",
                "password": "HZU616yLDudTvNWHus-o",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 149,
                "email": "donghuydieu@outlook.com",
                "password": "0INeyjog3PySnyhxA_Sg",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 150,
                "email": "vuquangnghe@gmail.com",
                "password": "j4xGpKfOKcqGIhqdiGTU",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 151,
                "email": "truongnucoc@gmail.com",
                "password": "YirRH0c_ph4jZF6R6lLa",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 152,
                "email": "ngohaong@outlook.com",
                "password": "u3ozYcyDNjUN8ldivO5y",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 153,
                "email": "phamtiennu@gmail.com",
                "password": "QFYqtbJA8rrGlWLHY6zD",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 154,
                "email": "dangxuanmang@outlook.com",
                "password": "3fzvOE0kZFGR7aoZVqGv",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 155,
                "email": "trinhthica@outlook.com",
                "password": "FYzMh1tesj9h7Jw8u9A6",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 156,
                "email": "dangthinien@outlook.com",
                "password": "h0Y3d2IwHMczzqZtPzrH",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 157,
                "email": "dangminhngoc@outlook.com",
                "password": "YGPnuC81tRAv0Yyuy2ay",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 158,
                "email": "duongvanchu@gmail.com",
                "password": "aBvUjSyZMiz-3DY_RUq9",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 159,
                "email": "vuvanba@outlook.com",
                "password": "crlXJwDmwjlq4AQSO3ED",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 160,
                "email": "lyhuyba@outlook.com",
                "password": "8t0hmZrWkYdHgfII1xr2",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 161,
                "email": "phamquangtien@gmail.com",
                "password": "bmWiwhocVFQVs9i4Wcxl",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 162,
                "email": "dongthikhieu@outlook.com",
                "password": "NY5qCKSXjn94w_yODXWy",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 163,
                "email": "lydieucat@gmail.com",
                "password": "As3LRIXqGYfgC-V5BxdC",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 164,
                "email": "tranquangtung@outlook.com",
                "password": "-V4Ygs7aIrxQZZHM8BSm",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 165,
                "email": "trinhxuanlinh@outlook.com",
                "password": "Ha1XS0QMvRyB0C_8OG_I",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 166,
                "email": "hominhang@outlook.com",
                "password": "45OCjSEU4WMuP_C5600s",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 167,
                "email": "lyvancap@outlook.com",
                "password": "Tl1rCPyhFyIlX8h3b_0V",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 168,
                "email": "vuxuanton@gmail.com",
                "password": "eEqaJKZl3_r2yFBPeKX3",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 169,
                "email": "huynhvankhieu@gmail.com",
                "password": "6et5dhfZ8e5qD8c3JO6u",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 170,
                "email": "vudieuthoi@outlook.com",
                "password": "HV9flCDyGnxdsHaPPGH_",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 171,
                "email": "dongtiencong@gmail.com",
                "password": "JavKegOY3vS4VB1J8vgI",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 172,
                "email": "trinhvanhuynh@outlook.com",
                "password": "as7QAfgqS7W7tZ6dY9gM",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 173,
                "email": "buiminhchuong@gmail.com",
                "password": "xN2cPnbXQvBvyp69DsNN",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 174,
                "email": "tranthivong@outlook.com",
                "password": "_V3pe1a8cTXdOZBvSdTE",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 175,
                "email": "doannutuong@outlook.com",
                "password": "h7pRhMEgdp-9A0WWEu8k",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 176,
                "email": "letienuong@outlook.com",
                "password": "kYcq0waeJkhqylhMZEKf",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 177,
                "email": "lyminhdan@gmail.com",
                "password": "iepUDr5JoXK68yUFImrM",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 178,
                "email": "dohaphu@outlook.com",
                "password": "Xmo-cFhbj3KPN-9OO2CH",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 179,
                "email": "buitiennu@gmail.com",
                "password": "gZTzk9pcVYiaUbLEPTzq",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 180,
                "email": "huaminhtrinh@gmail.com",
                "password": "AuWnoR4VNeCe2ucd0JhI",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 181,
                "email": "huynhxuanlai@outlook.com",
                "password": "_rH8BHPbKN-JMP6knffG",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 182,
                "email": "trannuvinh@gmail.com",
                "password": "KoNRoelh97cLN0eiFblF",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 183,
                "email": "tranxuanhang@gmail.com",
                "password": "f94MaaKK9gGwN5lz0HYs",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 184,
                "email": "tranhacam@gmail.com",
                "password": "-Tp9n7iuV7MzmMAUCjae",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 185,
                "email": "tranminhnghe@outlook.com",
                "password": "papSPG_ZzaiThlrtwJD1",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 186,
                "email": "ngovaniem@gmail.com",
                "password": "PCCQed3LC-JS3mk2fssC",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 187,
                "email": "doxuanninh@gmail.com",
                "password": "etvtpMkqebhLDrrk2qwc",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 188,
                "email": "trinhthikan@outlook.com",
                "password": "Mt13QnT050-E-tTZK2sa",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 189,
                "email": "vutienhinh@outlook.com",
                "password": "5BqpvuJSWJNDHji4kt5-",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 190,
                "email": "dovankha@outlook.com",
                "password": "a9IVp_jJF-fPGJQSzzjY",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 191,
                "email": "hohainh@gmail.com",
                "password": "QqlQMegI3HHj_0EdGle7",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 192,
                "email": "dodieutu@outlook.com",
                "password": "reyXvRgycc_AL3GevT7m",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 193,
                "email": "nguyenhuybuu@gmail.com",
                "password": "pm4ZCIzEci-Nwubf_0N-",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 194,
                "email": "duongthiich@gmail.com",
                "password": "W1yUBm9Iw9SZLcvx72Jg",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 195,
                "email": "doantienlang@outlook.com",
                "password": "RXWxwsFojtqZyaURWp-T",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 196,
                "email": "duongnupho@outlook.com",
                "password": "7DkYV1duznA3Y7EPjPsU",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 197,
                "email": "dangdieucam@gmail.com",
                "password": "m7dTK5io73Dl1OpBs9M8",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 198,
                "email": "phamhakham@gmail.com",
                "password": "wtofD4BLtOCqqyVYJcRn",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 199,
                "email": "phixuanlieu@outlook.com",
                "password": "SgYRdbrGEpVAQ8QKC2HD",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 200,
                "email": "buiminhbi@gmail.com",
                "password": "l28VoV0d6I0NF7T8p8Ne",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 201,
                "email": "huynhvanvan@outlook.com",
                "password": "ssCjHZIKAbIl3S6ANfJJ",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 202,
                "email": "duongtiensuu@outlook.com",
                "password": "xhHHuT8wDjyGz8s5des2",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 203,
                "email": "daonulai@outlook.com",
                "password": "EuvKSaoaQqtwRlpbAK3O",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 204,
                "email": "huahangan@gmail.com",
                "password": "T-VnLRT3OH74hYsiCMPe",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 205,
                "email": "hohuykham@outlook.com",
                "password": "y1drESduH0r2w8DRKweE",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 206,
                "email": "dangxuandi@gmail.com",
                "password": "R_Gi61Xt-OGUclQXjn4h",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 207,
                "email": "lyquangcoc@outlook.com",
                "password": "S-WZDPVyN0jAk7j-bOTl",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 208,
                "email": "phanminhquan@gmail.com",
                "password": "uy3UmG2Hv9FdHdE3xz7k",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 209,
                "email": "huynhhanguyen@gmail.com",
                "password": "ITe6aKMbFGJMh7eQZTA3",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 210,
                "email": "tranquangdiep@gmail.com",
                "password": "OiPFlyZZMjcX7PCvemn-",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 211,
                "email": "vuvanlo@outlook.com",
                "password": "UdzKEhNi_MzBsQyVOP99",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 212,
                "email": "truongvanong@outlook.com",
                "password": "0tksxV_CK8R2_u_WlnjU",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 213,
                "email": "dangnuhai@outlook.com",
                "password": "_wy1UZIF87mqbDNdh-Yy",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 214,
                "email": "truongxuangiao@outlook.com",
                "password": "RDkKfS_f48xYCAXH5x3r",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 215,
                "email": "trinhtienchuong@gmail.com",
                "password": "YqhnbSGKcbSYXmrTVlR6",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 216,
                "email": "phanthivinh@outlook.com",
                "password": "o2mOFw1dvEXoEnoZ4YaM",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 217,
                "email": "duongvannghi@gmail.com",
                "password": "yHipdpZCJ_5pdYPpSBzj",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 218,
                "email": "lythilu@outlook.com",
                "password": "l1f69XDMGDzrpsBRWSvs",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 219,
                "email": "dongvanvan@gmail.com",
                "password": "09aCdMVOokRT2AvshZiL",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 220,
                "email": "doanxuantoan@outlook.com",
                "password": "2QCIvhnXtzzv7Do006_G",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 221,
                "email": "tranvanphuong@gmail.com",
                "password": "2Y17ioyUv7V1YVUodSCv",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 222,
                "email": "duongtienpho@gmail.com",
                "password": "p3ujLv1ygfZaHB6CY5ut",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 223,
                "email": "nguyenhabac@outlook.com",
                "password": "J3AUMu7DXe9EwfCM0XcN",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 224,
                "email": "doanxuanquat@gmail.com",
                "password": "UXJiEswaA_7Hxh2WHqG1",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 225,
                "email": "huahuybang@gmail.com",
                "password": "nOAY2e_LDx6PwMpgAWzQ",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 226,
                "email": "truonghuykham@outlook.com",
                "password": "wzaVHu6qEyExCPB1Zz1O",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 227,
                "email": "doxuanich@outlook.com",
                "password": "AFib3BX8gh0IUs7lpvpj",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 228,
                "email": "lythiviem@gmail.com",
                "password": "1XbawX3oV2CUYojto29E",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 229,
                "email": "vuhuythi@gmail.com",
                "password": "b7ce_qyonYIlt0OwhC8G",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 230,
                "email": "buiquangcanh@gmail.com",
                "password": "wMBFLW1JCXoE8YNAz8Gt",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 231,
                "email": "phitienvan@outlook.com",
                "password": "ksiVwgfrOK6nHR4cKOcY",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 232,
                "email": "truonghuymai@outlook.com",
                "password": "m89h-d_vUN1M9G8PWkFg",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 233,
                "email": "phantienu@gmail.com",
                "password": "d4aGOR3FuI_k3NBMZhVE",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 234,
                "email": "huaminhliu@outlook.com",
                "password": "sZ13qo0lKkXtTqGCLlmh",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 235,
                "email": "ngotientri@gmail.com",
                "password": "i4g-fFHIPMe_HTgMK9vl",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 236,
                "email": "buixuanvinh@outlook.com",
                "password": "iZBR-N2BRRLohGUaj5ke",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 237,
                "email": "phamminhon@outlook.com",
                "password": "RuszeL09NZ1Xe01OHjfT",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 238,
                "email": "buihanguyen@gmail.com",
                "password": "kHIgpjFAC7m0Hyom5MIy",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 239,
                "email": "daonuthat@outlook.com",
                "password": "EqzFbMJdPU9BD_dgfDWb",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 240,
                "email": "truongnukhu@outlook.com",
                "password": "Pnq0bvuyX_YBXM2Yv_Vg",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 241,
                "email": "phanthikieu@gmail.com",
                "password": "OzcQ-r0Kcqiy6HukmIcI",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 242,
                "email": "duongvanha@outlook.com",
                "password": "9Q7H9KZyeFoyBgeBH1LF",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 243,
                "email": "duongquangau@outlook.com",
                "password": "MdjGl7Qz9fmnrXZkG-fN",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 244,
                "email": "trandieulieu@gmail.com",
                "password": "flGCePngl2vCZS03Q9LZ",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 245,
                "email": "lynuquat@gmail.com",
                "password": "JoGH9FIiCB2ebAz59DJw",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 246,
                "email": "phamdieuthac@outlook.com",
                "password": "jIVK2p0bGmvDGtVhekw5",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 247,
                "email": "trinhdieulinh@gmail.com",
                "password": "8s8GGweT1DzfEjvPjTQc",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 248,
                "email": "truongthichung@outlook.com",
                "password": "Ep0Nhb8OcIzxPBbZ74je",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 249,
                "email": "dongquangmuc@outlook.com",
                "password": "WwWxGhLb5OvpSUYrT5t9",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 250,
                "email": "letiencan@gmail.com",
                "password": "k2S4Bo4S9hH371BVh6Tw",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 251,
                "email": "trinhminhton@outlook.com",
                "password": "zqCYnjnyCY-8NCyDkYgC",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 252,
                "email": "lyhuybat@gmail.com",
                "password": "6tcuysYiXNGH1jS6C5dX",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 253,
                "email": "trinhvantiet@outlook.com",
                "password": "JNA7IfTOl-WKNCb9INlz",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 254,
                "email": "ngotienton@outlook.com",
                "password": "WuNSyoFb0ygKUUOxWG-m",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 255,
                "email": "ngotiencan@gmail.com",
                "password": "5ooCb14RWUJqAz_idv29",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 256,
                "email": "phivankha@outlook.com",
                "password": "6l9x6njuzfpceKUCWZ4F",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 257,
                "email": "phamquangngu@gmail.com",
                "password": "FfzCBc2NLwMyA29TDtwO",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 258,
                "email": "vuminhmien@gmail.com",
                "password": "OenbdIdGN8U19pF_FkRd",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 259,
                "email": "hominhhoang@outlook.com",
                "password": "49dsAisD38XnJs7YPIOg",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 260,
                "email": "dangtienau@outlook.com",
                "password": "HhGKr9I0x4ZOAj0_egMt",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 261,
                "email": "ledieuban@gmail.com",
                "password": "7fxwVhr8QnAzwR9O05x_",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 262,
                "email": "nguyendieunha@outlook.com",
                "password": "WvhGXG9dBSwLyNqH4qRg",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 263,
                "email": "truongtienthai@gmail.com",
                "password": "RKPRxynWTDEDu3Yi2oEV",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 264,
                "email": "buixuana@gmail.com",
                "password": "QhBtKmlNNGgkde9uZYox",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 265,
                "email": "trinhquangquac@outlook.com",
                "password": "d65LshUH6YzB_nES624Q",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 266,
                "email": "truonghathuong@gmail.com",
                "password": "CmIF_DQjTw7uMaye2Dqa",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 267,
                "email": "dohavu@outlook.com",
                "password": "beHNbZE1XAOq0B-GMSXr",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 268,
                "email": "ngonuan@outlook.com",
                "password": "xNZ7ryEk-emoPJGRQGmP",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 269,
                "email": "phinuquan@outlook.com",
                "password": "b4LkDLm0eOpzsCTmAT2C",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 270,
                "email": "lenuien@gmail.com",
                "password": "Gf8XZNpube8o2ZzzwZ4-",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 271,
                "email": "lyvanngo@gmail.com",
                "password": "3mc_IGm8Y4Ni7FF7qnUZ",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 272,
                "email": "lequangu@outlook.com",
                "password": "f8x6ghzB9cmHFbJuOsxi",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 273,
                "email": "buitienboi@gmail.com",
                "password": "wFMU7wgevJauzNndo7EH",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 274,
                "email": "dangdieuloi@gmail.com",
                "password": "37Vg_d1LP9jJSot7u3Hy",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 275,
                "email": "dongdieuviem@outlook.com",
                "password": "W2qrSKPsPqGHNvDusVjl",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 276,
                "email": "daoquangcam@outlook.com",
                "password": "hrIhQvM3LnI5Xb5GQCQw",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 277,
                "email": "phamxuanbe@outlook.com",
                "password": "HkFREGSQWJtC_k9QtFih",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 278,
                "email": "duongdieubinh@outlook.com",
                "password": "u6xaYf67gwv7hnkmaRvc",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 279,
                "email": "dongnupham@outlook.com",
                "password": "k_qgBykqcZ8_mE1O2z2P",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 280,
                "email": "lehavinh@gmail.com",
                "password": "YvoDLcwuKSirHb2yj3rV",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 281,
                "email": "huynhdieunghia@gmail.com",
                "password": "b3yByWcanONY2NeE2cyD",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 282,
                "email": "lyhuymanh@gmail.com",
                "password": "dmrUf21-l1r0MD0uBcjJ",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 283,
                "email": "dangvanbe@outlook.com",
                "password": "dsosp_N5-Eth3qEUviFa",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 284,
                "email": "nguyenquangbien@outlook.com",
                "password": "-gsyvF6dAfglRc-g5CjL",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 285,
                "email": "buivanich@outlook.com",
                "password": "zFTVls8bQ_wDBPcZK1NT",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 286,
                "email": "phinube@outlook.com",
                "password": "n3F45JGJkZHEipavSsUv",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 287,
                "email": "nguyenvanlich@gmail.com",
                "password": "TqFo8SscxDl31XWQHYKJ",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 288,
                "email": "dangvankhien@outlook.com",
                "password": "A5cV_5sNe-1a6jGxumey",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 289,
                "email": "phanhacan@gmail.com",
                "password": "PHKQOzfhTRyvrITo9PyH",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 290,
                "email": "doxuannghe@gmail.com",
                "password": "crBpnDYXJC9tQUeh9-Mi",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 291,
                "email": "phithiieu@gmail.com",
                "password": "Hlw7m0x4DUhIM7TmKVtL",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 292,
                "email": "tranxuankieu@outlook.com",
                "password": "qSg3SAc5dOFd9edJZYF8",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 293,
                "email": "truongvanti@gmail.com",
                "password": "Q6RrAEcThaWcJhsvs1Zj",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 294,
                "email": "huaminhtien@outlook.com",
                "password": "CkUYP7YmjNqLyWyPNRf0",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 295,
                "email": "dangquangphong@gmail.com",
                "password": "w0gpX9K-kaBQqqCiEM3i",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 296,
                "email": "dohuyton@outlook.com",
                "password": "rMbfC7grHZrAT5VgJBdB",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 297,
                "email": "huanumai@outlook.com",
                "password": "UsMzXwoosM7UffwGUtlr",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 298,
                "email": "phannuchuyen@gmail.com",
                "password": "OfsWM3DNJmyuyBUp375e",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 299,
                "email": "dangtienvinh@outlook.com",
                "password": "yLeXeuIBwT8ZcQg17Vlj",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 300,
                "email": "huanuuyen@outlook.com",
                "password": "LCwp14IBJ0fKdnCKWD64",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 301,
                "email": "duongquangnung@gmail.com",
                "password": "X9m6R9N2l2Amq2tCbYEd",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 302,
                "email": "phanhuymai@gmail.com",
                "password": "W4ywikFmN8Zg6Nb0XLd3",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 303,
                "email": "doquangtao@outlook.com",
                "password": "Byw4GVwWxSM4umFdpEUQ",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 304,
                "email": "phamnuca@gmail.com",
                "password": "aMHDXPpMpxlcQgvyUXnq",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 305,
                "email": "lehanong@outlook.com",
                "password": "IOYhRwYgCSm-ty_oh62u",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 306,
                "email": "lehapham@gmail.com",
                "password": "IOo85r7X7DUEWpSNZBbn",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 307,
                "email": "dangxuanluu@gmail.com",
                "password": "CNQ7XeXRO5A4LNyHeHuu",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 308,
                "email": "truongvanhai@outlook.com",
                "password": "ruA__JiEY4FPwkbRhMXE",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 309,
                "email": "trinhthiho@gmail.com",
                "password": "9LH1IqL9hjucTF4UKNtM",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 310,
                "email": "huynhhuyla@gmail.com",
                "password": "-280pr9ntWY4MQ1LY-dN",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 311,
                "email": "hothihoa@outlook.com",
                "password": "ejkoIac-1C0I3vIHvry6",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 312,
                "email": "phihuyung@gmail.com",
                "password": "_O8WWIB3SC32wLG8_8hV",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 313,
                "email": "phamquangcong@outlook.com",
                "password": "hikwirEB67kn_3kSrZea",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 314,
                "email": "hodieusam@outlook.com",
                "password": "ObuiBDu3IJ-sONHZucdP",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 315,
                "email": "nguyendieuca@gmail.com",
                "password": "DUia_A5n5Ie_-4lsEb7t",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 316,
                "email": "buivankhuong@gmail.com",
                "password": "1MwXOrlufJV5DzNgQaNb",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 317,
                "email": "dangminhcan@gmail.com",
                "password": "fisEXV5cyZ1fY24k7jaJ",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 318,
                "email": "nguyenminhkhuc@gmail.com",
                "password": "w4QM4vX3i9MC6hqEb1UG",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 319,
                "email": "huatienac@outlook.com",
                "password": "0obyxgCMUdUmxmQAPd6N",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 320,
                "email": "trinhxuannga@gmail.com",
                "password": "se3a3BVCjzVfO4R39DTi",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 321,
                "email": "nguyennuton@gmail.com",
                "password": "XrXJuFUtOcz8uDMXjlWd",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 322,
                "email": "vuvanvi@outlook.com",
                "password": "6GoeLkH1dt_fPA9u20Ai",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 323,
                "email": "dangxuanhap@gmail.com",
                "password": "xxmXcwrn2CEgSfZKhvSh",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 324,
                "email": "huynhhatu@gmail.com",
                "password": "1CDMCOB9GZ80W-nFbqN8",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 325,
                "email": "buivanquac@outlook.com",
                "password": "wGpAJJ5sRjylIg2PD32i",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 326,
                "email": "phitienquynh@outlook.com",
                "password": "2lOEfpgK7o6fI_X6L4z0",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 327,
                "email": "huynhthilich@outlook.com",
                "password": "TBwqny6CqOi7FXTmQCcJ",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 328,
                "email": "trinhdieuvo@outlook.com",
                "password": "8hproUXzNJ0psMldVKtr",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 329,
                "email": "tranvantra@gmail.com",
                "password": "w08wvkBJgPKNdN_IyyFN",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 330,
                "email": "ngoxuanuat@gmail.com",
                "password": "6ZgKQbTUFrS5hdvAEw8b",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 331,
                "email": "trinhnuda@gmail.com",
                "password": "KtPEOTh5AGNG0Ak_mkxk",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 332,
                "email": "lethinhat@gmail.com",
                "password": "zIgc3FsVritBt2UM2NGB",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 333,
                "email": "danghuytiet@outlook.com",
                "password": "PcSqnC6kfasPq54Gtg7T",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 334,
                "email": "dongxuanieu@gmail.com",
                "password": "NAm9nGNdsMY-g9_pJEnl",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 335,
                "email": "doandieuthien@outlook.com",
                "password": "lUZ1hiOkr6lR2q_ut5kV",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 336,
                "email": "huynhhuyti@outlook.com",
                "password": "ErCOmqkUwrz64YCLpnsr",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 337,
                "email": "dongquanglu@gmail.com",
                "password": "CYg0cuFsM3qeTrTUFW52",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 338,
                "email": "trinhminhac@outlook.com",
                "password": "3q13vFKWYziJwfRCiCTi",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 339,
                "email": "buitienhao@outlook.com",
                "password": "BUjMa6MiO6bvLMzT10bz",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 340,
                "email": "dangvantrieu@outlook.com",
                "password": "oG6skXmhSHWv4I7bmY0V",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 341,
                "email": "honunung@gmail.com",
                "password": "MSCffHETGi4Qhsv1A9_E",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 342,
                "email": "doquangcam@gmail.com",
                "password": "kHHFFKd9Upy8o4Ng7Lxc",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 343,
                "email": "lyquangnguy@gmail.com",
                "password": "cFKvexvBExBagwa8DZT3",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 344,
                "email": "dotiena@outlook.com",
                "password": "NWb9TCoihQ4BxlAcVikj",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 345,
                "email": "trannunu@outlook.com",
                "password": "u-opEuBeM0McVafguDrS",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 346,
                "email": "lyhatrieu@outlook.com",
                "password": "w8I34d0QWGewHOvHXjSW",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 347,
                "email": "truongxuanac@gmail.com",
                "password": "uDzfbccUX-1EzAxMTKQu",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 348,
                "email": "nguyenhamau@gmail.com",
                "password": "4dj-qXrVsqbidrA-mk-J",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 349,
                "email": "duongtiennong@outlook.com",
                "password": "cZptGvdt00UwumW80Fpj",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 350,
                "email": "phamxuannung@gmail.com",
                "password": "DPOjIwnPtszeTnKTzJCS",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 351,
                "email": "dohangoc@outlook.com",
                "password": "RlzA_-3Rybafl-gcrcpB",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 352,
                "email": "hoxuantu@outlook.com",
                "password": "cSBBSqqV0uTSpa9mpar_",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 353,
                "email": "doannuao@gmail.com",
                "password": "mnj5MmRzU1xqyI8tymo6",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 354,
                "email": "phanthihan@gmail.com",
                "password": "_2MI4JnNwHNfLhfw6R2b",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 355,
                "email": "lyhatrang@outlook.com",
                "password": "JeeGDbCelEUPUeJXWzG7",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 356,
                "email": "buidieuluc@gmail.com",
                "password": "-sntaGdFr2UU5X6bfp7o",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 357,
                "email": "vuxuandi@gmail.com",
                "password": "fbOxqwd9Nyl5a4CAK_wq",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 358,
                "email": "truongdieumai@gmail.com",
                "password": "VpWWDXa0tiPbEoDTXYIc",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 359,
                "email": "daoxuannu@gmail.com",
                "password": "bqEYqxhd-tu2YfrweVa-",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 360,
                "email": "duongxuanong@gmail.com",
                "password": "OYe2vhtPwhv5q-_cqY5T",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 361,
                "email": "dangminhdiep@outlook.com",
                "password": "XbdDiWFN2rUwmmlpdmMJ",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 362,
                "email": "phamminhviet@gmail.com",
                "password": "yZJJ9Ju6NsBmbB5iqGXi",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 363,
                "email": "trinhdieuchu@gmail.com",
                "password": "so8So9Nrt1hXzgQkI8Rj",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 364,
                "email": "phihuyhoai@gmail.com",
                "password": "Dyo3OxgFs2mHDmrnsfKQ",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 365,
                "email": "phithilich@outlook.com",
                "password": "13FxGPsTuB00MWlP1I5J",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 366,
                "email": "dongnuta@outlook.com",
                "password": "U2yiuDgAfW5GjiTsEvqW",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 367,
                "email": "daoquangton@outlook.com",
                "password": "vWy2UvU-SDF4py-ZAMi-",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 368,
                "email": "daovanchiem@gmail.com",
                "password": "35dLobdasB4ZRcAp_XaC",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 369,
                "email": "nguyenxuanon@outlook.com",
                "password": "yIpQrcydPJ6wpndWj8tT",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 370,
                "email": "phanhamien@gmail.com",
                "password": "_-YzHc1FhJ2APz6yh9Dl",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 371,
                "email": "letientrung@outlook.com",
                "password": "2evtJmsEw3CgnOa9p4ah",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 372,
                "email": "huanumang@outlook.com",
                "password": "U1mlxxyibtYxREULOyOB",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 373,
                "email": "duongtiennghia@outlook.com",
                "password": "d0_d0_rZz8GLkhc_KBlr",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 374,
                "email": "vuminhlao@outlook.com",
                "password": "TyZMAZ2P6W1JiBicrzYi",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 375,
                "email": "nguyenminhlo@outlook.com",
                "password": "0uVxr6VBatgfT4hV3QsU",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 376,
                "email": "vuhuyvinh@gmail.com",
                "password": "sTRQ8UuD4A-dD6Q1bIA_",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 377,
                "email": "vuhanan@gmail.com",
                "password": "fuuAtg5S2TZe3UxvWW_P",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 378,
                "email": "dangxuanbo@gmail.com",
                "password": "UkUtKdfQPbf5GELndzNp",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 379,
                "email": "ngominhguong@outlook.com",
                "password": "30fmLHUwv0dhWoALnnrn",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 380,
                "email": "nguyenhavien@outlook.com",
                "password": "A5QmNF4OVDr4R5ihYYg7",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 381,
                "email": "buitienkhoi@outlook.com",
                "password": "c22kXlv3d04TADRAlXbc",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 382,
                "email": "phanxuanvinh@outlook.com",
                "password": "Pv0MjnxTTRmOCBtwE8kP",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 383,
                "email": "nguyenhatao@outlook.com",
                "password": "4CPbXbrtQUgV-9gpJ25i",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 384,
                "email": "nguyendieuhuyen@outlook.com",
                "password": "PFkiv8jfdWCcMerpmnWU",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 385,
                "email": "truongxuanngu@outlook.com",
                "password": "tCgY0q7IbDqDxTAGqwSp",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 386,
                "email": "hotienloi@outlook.com",
                "password": "9v8BZE3XEO3e7iqykwzN",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 387,
                "email": "doanvansam@outlook.com",
                "password": "T_0JVXuRiT_l0ZvbbQon",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 388,
                "email": "lethimuc@outlook.com",
                "password": "xGqXe-cuaM8kOtYArpxk",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 389,
                "email": "dongnuau@outlook.com",
                "password": "NMjEQp2UT_3eo9CYEQTy",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 390,
                "email": "nguyenvanlo@gmail.com",
                "password": "wZGa5rJ71UOouM1bvlHf",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 391,
                "email": "doandieucham@gmail.com",
                "password": "M7mDlNNOmwJZez0NT3HS",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 392,
                "email": "doanxuantran@gmail.com",
                "password": "b9rmlHyqmvIcwCtqRh_u",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 393,
                "email": "phidieubo@outlook.com",
                "password": "1iG2wkQYbSA3qQOecVRp",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 394,
                "email": "ngonuhung@outlook.com",
                "password": "jB5ElHPOnNgb8ZaDeGbn",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 395,
                "email": "dohahoa@outlook.com",
                "password": "FPB75fpo20ATj5IRUSxC",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 396,
                "email": "duongminhngoc@outlook.com",
                "password": "g1EiiLR9uviNWib7tRsn",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 397,
                "email": "huynhhaxa@gmail.com",
                "password": "IyD1JFz_CNNrtE2bdKD5",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 398,
                "email": "lythivu@gmail.com",
                "password": "JZkHHty5GOKaOSrSMFS3",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 399,
                "email": "phihaquang@gmail.com",
                "password": "TbApuHWORXctci8Wjuqp",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 400,
                "email": "ngonutan@gmail.com",
                "password": "EY7Ek6aFaZ_iipsLWQAf",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 401,
                "email": "daotienma@outlook.com",
                "password": "MWkWyVdEiAWNe3fIr-mW",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 402,
                "email": "tranminhbach@gmail.com",
                "password": "5JdRUurj8HvmJDRETJnW",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 403,
                "email": "dothihoai@gmail.com",
                "password": "8WFMvOkGSq7r_yejyhg9",
                "userRoleId": 1,
                "userLevelId": 1
            },
            {
                "id": 404,
                "email": "buihaphung@outlook.com",
                "password": "CTDUf55Mk_LhPnh7esB_",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 405,
                "email": "huynhhagiang@outlook.com",
                "password": "iYmYOf_4xSiE81F8jrm_",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 406,
                "email": "nguyenhaong@outlook.com",
                "password": "vWFogXaYa9B01KU8bwVG",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 407,
                "email": "donghuyson@outlook.com",
                "password": "2OpQdmXHvU3ZcYbrHiL1",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 408,
                "email": "nguyenhuymang@gmail.com",
                "password": "8wGFGkmSYX2lAcPHJmDk",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 409,
                "email": "dongnuchang@gmail.com",
                "password": "lIDjVf4W7ogW3jDCmOrX",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 410,
                "email": "ngothibong@gmail.com",
                "password": "wFkQqsgVcPWOw1wk3fyv",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 411,
                "email": "dongnuao@gmail.com",
                "password": "RyKWYAdh3HkUmcOOpy4B",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 412,
                "email": "huynhvansi@outlook.com",
                "password": "2ycGmC8vARC1s1_wtMwC",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 413,
                "email": "donghaquan@outlook.com",
                "password": "ovUKTTuHm3lH8OuzJNJ0",
                "userRoleId": 1,
                "userLevelId": 4
            },
            {
                "id": 414,
                "email": "tranxuancong@outlook.com",
                "password": "mrtzWFcJI9dfiuGMqwMv",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 415,
                "email": "lytiencham@outlook.com",
                "password": "PrzBlsChcgIJhySdvL2Y",
                "userRoleId": 1,
                "userLevelId": 2
            },
            {
                "id": 416,
                "email": "doanxuannong@outlook.com",
                "password": "HUXNKKYiUMmEYOpr4tNd",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 417,
                "email": "nguyenhuybach@outlook.com",
                "password": "AhkvSsWnufXZctpD9bHY",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 418,
                "email": "daoquanglu@outlook.com",
                "password": "KjNunpl7AZfhcmcvNAwe",
                "userRoleId": 1,
                "userLevelId": 3
            },
            {
                "id": 419,
                "email": "vuquangcham@outlook.com",
                "password": "VJstD_GaTvWJNyEa-RZ2",
                "userRoleId": 1,
                "userLevelId": 5
            },
            {
                "id": 420,
                "email": "trungnt2411@gmail.com",
                "password": "Trung@123",
                "userRoleId": 1,
                "userLevelId": 5,
                "isEmailVerified": true,
            },
        ])
    }
}
