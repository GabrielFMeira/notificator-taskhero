import MetaRepository from "../repository/MetaRepository.js";

const metaRepository = new MetaRepository();

export default class MetaService {
    static async expireMetas() {
        await metaRepository.markMetasAsExpired();
    }
}