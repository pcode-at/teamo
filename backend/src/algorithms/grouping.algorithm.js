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
function getAllSkillsFromAProject(projectId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.projects.findUnique({
                        where: {
                            id: projectId
                        },
                        select: {
                            skills: {
                                select: {
                                    skill: {
                                        select: {
                                            id: true
                                        }
                                    }
                                }
                            }
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getMatchingPercentage(skillId1, skillId2) {
    return __awaiter(this, void 0, void 0, function () {
        var totalOccourences, test2, combinedOccourences;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.userSkills.aggregate({
                        where: {
                            skillsId: {
                                equals: skillId1
                            }
                        },
                        _count: true
                    })];
                case 1:
                    totalOccourences = _a.sent();
                    return [4 /*yield*/, prisma.userSkills.groupBy({
                            by: ["identifier"],
                            where: {
                                OR: [
                                    {
                                        skillsId: {
                                            equals: skillId1
                                        }
                                    },
                                    {
                                        skillsId: {
                                            equals: skillId2
                                        }
                                    },
                                ]
                            },
                            _count: true,
                            orderBy: {
                                _count: {
                                    identifier: "desc"
                                }
                            }
                        })];
                case 2:
                    test2 = _a.sent();
                    combinedOccourences = test2.filter(function (skill) { return skill._count > 1; });
                    if (combinedOccourences.length === 0) {
                        return [2 /*return*/, 0];
                    }
                    return [2 /*return*/, combinedOccourences.length / totalOccourences._count];
            }
        });
    });
}
function getAllAggregationPercentagesOfSkills(projectId) {
    return __awaiter(this, void 0, void 0, function () {
        var skills, skillIds, mapping, i, j, skillMap, _a, _b;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, getAllSkillsFromAProject(projectId)];
                case 1:
                    skills = _d.sent();
                    skillIds = skills.skills.map(function (skill) { return skill.skill.id; });
                    mapping = new Map();
                    i = 0;
                    _d.label = 2;
                case 2:
                    if (!(i < skillIds.length)) return [3 /*break*/, 7];
                    j = i + 1;
                    _d.label = 3;
                case 3:
                    if (!(j < skillIds.length)) return [3 /*break*/, 6];
                    skillMap = mapping.get(skillIds[i]);
                    if (skillMap == null) {
                        skillMap = {
                            compatibility: []
                        };
                    }
                    _b = (_a = skillMap.compatibility).push;
                    _c = {
                        skill: skillIds[j]
                    };
                    return [4 /*yield*/, getMatchingPercentage(skillIds[i], skillIds[j])];
                case 4:
                    _b.apply(_a, [(_c.percentage = _d.sent(),
                            _c)]);
                    mapping.set(skillIds[i], skillMap);
                    _d.label = 5;
                case 5:
                    j++;
                    return [3 /*break*/, 3];
                case 6:
                    i++;
                    return [3 /*break*/, 2];
                case 7: return [2 /*return*/, mapping];
            }
        });
    });
}
function getSkillGroupings(projectId) {
    return __awaiter(this, void 0, void 0, function () {
        var skillGroupings, percentages, percentageArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    skillGroupings = [];
                    return [4 /*yield*/, getAllAggregationPercentagesOfSkills(projectId)];
                case 1:
                    percentages = _a.sent();
                    percentages.forEach(function (skillMap, key) {
                        skillMap.compatibility.forEach(function (compatibility) {
                            if (compatibility.percentage > 0.5) {
                                skillGroupings.push([key, compatibility.skill]);
                            }
                        });
                    });
                    percentageArray = [];
                    percentages.forEach(function (skillMap, key) {
                        skillMap.compatibility
                            .filter(function (skill) { return skill.percentage >= 0.375; })
                            .forEach(function (compatibility) {
                            percentageArray.push([key, compatibility.skill]);
                        });
                    });
                    skillGroupings.forEach(function (skillGrouping) {
                        percentageArray
                            .filter(function (s) { return !skillGrouping.includes(s); })
                            .forEach(function (skill) {
                            if (skillGrouping.every(function (e) {
                                console.log(e);
                                percentageArray.filter(function (s) { return s.includes(skill[0]); }).includes(e);
                            })) {
                                skillGroupings.push(skill);
                            }
                        });
                    });
                    console.log(skillGroupings);
                    return [2 /*return*/];
            }
        });
    });
}
getSkillGroupings("62c7fbb4aba3578343a8f9a0");
