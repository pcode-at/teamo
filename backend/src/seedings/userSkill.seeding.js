"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function seedUserSkills() {
    return __awaiter(this, void 0, void 0, function () {
        var users, skills, userSkills, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.users.findMany()];
                case 1:
                    users = _a.sent();
                    return [4 /*yield*/, prisma.skills.findMany()];
                case 2:
                    skills = _a.sent();
                    return [4 /*yield*/, prisma.userSkills.deleteMany()];
                case 3:
                    _a.sent();
                    userSkills = [];
                    users.forEach(function (user) {
                        // Get 10 random values of skills
                        var randomSkills = skills
                            .filter(function (skill) { return skill.name != "English" && skill.name != "German"; })
                            .sort(function () { return Math.random() - 0.5; })
                            .slice(0, 10);
                        // Add the 10 skills with the user and a rating to the userSkills Array
                        randomSkills.forEach(function (skill) {
                            userSkills.push({
                                user: user.identifier,
                                skill: skill.id,
                                rating: Math.floor(Math.random() * 9) + 1
                            });
                        });
                        // Add German to the User
                        userSkills.push({
                            user: user.identifier,
                            skill: skills.find(function (skill) { return skill.name == "German"; }).id,
                            rating: Math.floor(Math.random() * 6) + 4
                        });
                        // Add English to the User with and 80% chance
                        if (Math.random() > 0.2) {
                            userSkills.push({
                                user: user.identifier,
                                skill: skills.find(function (skill) { return skill.name == "English"; }).id,
                                rating: Math.floor(Math.random() * 8) + 2
                            });
                        }
                    });
                    i = 0;
                    _a.label = 4;
                case 4:
                    if (!(i < userSkills.length)) return [3 /*break*/, 7];
                    return [4 /*yield*/, prisma.userSkills.create({
                            data: {
                                user: {
                                    connect: {
                                        identifier: userSkills[i].user
                                    }
                                },
                                skill: {
                                    connect: {
                                        id: userSkills[i].skill
                                    }
                                },
                                rating: "" + userSkills[i].rating
                            }
                        })];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 4];
                case 7: return [2 /*return*/];
            }
        });
    });
}
seedUserSkills();
