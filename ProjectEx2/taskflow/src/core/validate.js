const PRIORITIES = ['low', 'med', 'high'];

function validateTitle(title) {
  if (typeof title !== 'string') return 'title must be a string';
  const trimmed = title.trim();
  if (trimmed.length === 0) return 'title cannot be empty';
  if (trimmed.length > 200) return 'title cannot exceed 200 chars';
  return null;
}

function validatePriority(priority) {
  if (priority === undefined || priority === null) return null;
  if (!PRIORITIES.includes(priority)) {
    return `priority must be one of: ${PRIORITIES.join(', ')}`;
  }
  return null;
}

function validateTag(tag) {
  if (typeof tag !== 'string') return 'tag must be a string';
  if (!/^[a-z0-9-]{1,32}$/i.test(tag)) {
    return 'tag must be 1-32 chars: letters, digits, hyphen';
  }
  return null;
}

function validateId(id) {
  if (!Number.isInteger(id) || id < 1) return 'id must be a positive integer';
  return null;
}

module.exports = { PRIORITIES, validateTitle, validatePriority, validateTag, validateId };
