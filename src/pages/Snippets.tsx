import styled from '@emotion/styled';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SnippetList from '../components/SnippetList';
import { SUPPORTED_LANGUAGES } from '../constants/supported-languages';
import { SnippetContext } from '../context/snippet.context';
import { Button } from '../ui/Button';
import { Label } from '../ui/form/Form';
import { Select } from '../ui/form/Input';
import { getFilteredSnippets } from '../utils/snippets';

const Snippets = () => {
  const [languageFilter, setLanguageFilter] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewAll, setViewAll] = useState<boolean>(() => searchParams.get('mode') !== 'owner');
  const { getSnippets, snippets, ownSnippets, getOwnSnippets } = useContext(SnippetContext);

  useEffect(() => {
    getSnippets();
  }, []);

  useEffect(() => {
    if (!viewAll) {
      getOwnSnippets();
    }
  }, [viewAll]);

  const snippetsToShow = viewAll ? snippets : ownSnippets;
  const filteredSnippets = getFilteredSnippets(snippetsToShow, languageFilter);

  return (
    <div>
      <h1>Snippets</h1>

      <SnippetListWrapper>
        <div>
          <Label>
            <Select value={languageFilter} onChange={(e) => setLanguageFilter(e.target.value)}>
              <option value="">Filtrar por lenguaje 🔍</option>

              {SUPPORTED_LANGUAGES.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </Select>
          </Label>

          <Button
            onClick={() => {
              setViewAll((prev) => !prev);
              setSearchParams(viewAll ? { mode: 'owner' } : {});
            }}
          >
            {viewAll ? 'Mis Snippets' : 'Ver todos'}
          </Button>
        </div>

        <SnippetList snippets={filteredSnippets} isFilterApplied={!!languageFilter} />
      </SnippetListWrapper>
    </div>
  );
};

const SnippetListWrapper = styled.div``;

export default Snippets;
