import MetaRepository from "../repository/MetaRepository.js";

export default class MetaService {
    static async expireMetas() {
        const metaRepository = new MetaRepository();
        await metaRepository.markMetasAsExpired();
    }
}
