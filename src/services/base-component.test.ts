import { Block } from './base-component';

interface IMockProps {
    id: string;
    class: string;
    items: string[] | null;
}

let props;
let component: Block<IMockProps>;

beforeEach(() => {
    props = {
        id: 'component-id',
        class: 'test-class',
        items: null,
    };
    component = new Block<IMockProps>('div', props);
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Base component', () => {
    it('Создан компонент с дефолтными props', () => {
        expect(component.getProps()?.id).toBe('component-id');
        expect(component.getProps()?.class).toBe('test-class');
    });

    it('Вызывается хук mounted когда компонент смонтирован', () => {
        const componentMountedSpy = jest.spyOn(component, 'mounted');
        component.dispatchOnMounted();

        expect(componentMountedSpy).toHaveBeenCalled();
    });

    it('Вызывается хук hasUpdated при изменении props', () => {
        const componentHasUpdatedSpy = jest.spyOn(component, 'hasUpdated');
        component.setProps({ items: ['one', 'two'] });

        expect(componentHasUpdatedSpy).toHaveBeenCalled();
    });
});
