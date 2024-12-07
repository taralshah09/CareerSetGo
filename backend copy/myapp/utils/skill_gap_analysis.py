from sentence_transformers import SentenceTransformer, util
from rapidfuzz import fuzz, process
import nltk
from nltk.corpus import wordnet

nltk.download('wordnet')

model = SentenceTransformer('all-MiniLM-L6-v2')

def preprocess_skill(skill):
    return skill.lower().strip()

def get_synonyms(skill):
    synonyms = set()
    for synset in wordnet.synsets(skill):
        for lemma in synset.lemmas():
            synonyms.add(lemma.name().replace("_", " ").lower())
    return synonyms

def exact_context_match(skill1, skill2):
    return preprocess_skill(skill1) == preprocess_skill(skill2)

def calculate_semantic_similarity(user_skills, job_skills, threshold=0.8):
    user_embeddings = model.encode(user_skills, convert_to_tensor=True)
    job_embeddings = model.encode(job_skills, convert_to_tensor=True)
    similarity_matrix = util.pytorch_cos_sim(user_embeddings, job_embeddings)
    
    matched_skills = set()
    for i, sim_scores in enumerate(similarity_matrix):
        for j, score in enumerate(sim_scores):
            if score >= threshold:
                user_skill = preprocess_skill(user_skills[i])
                job_skill = preprocess_skill(job_skills[j])
                if exact_context_match(user_skill, job_skill) or score.item() >= threshold:
                    matched_skills.add(job_skill)
    return matched_skills

def fuzzy_match_skills(user_skills, job_skills):
    matched_skills = set()
    for user_skill in user_skills:
        matches = process.extract(user_skill, job_skills, scorer=fuzz.token_sort_ratio, limit=3)
        for match in matches:
            match_skill, similarity, _ = match
            threshold = 85 if len(user_skill.split()) > 1 else 75
            if similarity >= threshold and not exact_context_match(user_skill, match_skill):
                matched_skills.add(preprocess_skill(match_skill))
    return matched_skills

def skill_gap_analysis(user_skills, job_skills):
    user_skills = [preprocess_skill(skill) for skill in user_skills]
    job_skills = [preprocess_skill(skill) for skill in job_skills]

    matched_skills_semantic = calculate_semantic_similarity(user_skills, job_skills)
    matched_skills_fuzzy = fuzzy_match_skills(user_skills, job_skills)
    
    matched_skills = matched_skills_semantic.union(matched_skills_fuzzy)
    match_percentage = (len(matched_skills) / len(job_skills)) * 100
    missing_skills = set(job_skills) - matched_skills
    
    print("--->>",match_percentage)
    
    return {
        'match_percentage': round(match_percentage, 2),
        'matched_skills': list(matched_skills),
        'missing_skills': list(missing_skills)
    }
